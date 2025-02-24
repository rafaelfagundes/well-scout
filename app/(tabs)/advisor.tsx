import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { ProductState } from '@/features/products/productSlice';
import { callGeminiAPI, generatePromptForAdvisor } from '@/lib/ai';
import DietaryAnalysis from '@/features/advisor/DietaryAnalysis';
import { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import AdvisorLogo from '@/components/ui/AdvisorLogo';
import { ArrowCounterClockwise, Barcode, MagnifyingGlass } from 'phosphor-react-native';
import { EmptyList, EmptyListButton } from '@/components/ui/EmptyList';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


function createSimplifiedProductList(originalJson: ProductState) {
  // Extract the history array containing product data
  const products = originalJson.history;

  // Map each product to a simplified object
  const simplifiedProducts = products.map(product => {
    const productInfo = product.productInfo;
    const extraInfo = product.extraInfo;

    // Determine if the product is a solid or liquid for nutrimentsPer (heuristic based on category)
    const isLiquid = productInfo.category.toLowerCase().includes('beverage') ||
      productInfo.category.toLowerCase().includes('drink') ||
      productInfo.quantity.toLowerCase().includes('ml') ||
      productInfo.quantity.toLowerCase().includes('l');
    const nutrimentsPer = isLiquid ? '100ml' : '100g';

    // Extract ingredients as a simple array of text
    const ingredients = productInfo.ingredients.map(ingredient => ingredient.text);

    // Standardize energy fields in nutriments
    const nutriments = {
      ...productInfo.nutriments,
      energyKj: productInfo.nutriments.energy || productInfo.nutriments.energyKj,
      energyKcal: productInfo.nutriments.energyKcal
    };
    delete nutriments.energy; // Remove ambiguous "energy" field if present

    // Extract health warnings
    const healthWarnings = extraInfo.health.warnings.map(warning => warning.text);

    return {
      productName: productInfo.productName,
      brand: productInfo.brand,
      ingredients: ingredients,
      nutrimentsPer: nutrimentsPer,
      nutriments: nutriments,
      allergens: productInfo.allergens,
      additives: productInfo.additives,
      nutriScore: productInfo.nutriscore,
      ecoScore: productInfo.ecoscore,
      novaGroup: productInfo.novaGroup,
      servingSize: productInfo.servingSize,
      quantity: productInfo.quantity,
      healthWarnings: healthWarnings
    };
  });

  // Return the array of simplified product objects
  return simplifiedProducts;
}

export default function AdivisorScreen() {
  const productState = useSelector((state: RootState) => state.product);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if (productState.history.length === 0) {
        return;
      }
      try {
        setIsLoading(true);
        const simplifiedProducts = createSimplifiedProductList(productState);
        const systemPrompt = generatePromptForAdvisor(simplifiedProducts);
        const data = await callGeminiAPI(systemPrompt, abortController.signal);

        if (!abortController.signal.aborted) {
          setData({ report: JSON.parse(data), reportDate: new Date().toISOString() });
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching ", error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [productState.history]);

  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (isLoading) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <View style={{ height: 20 }}></View>
          <AdvisorLogo size={200} />
          <View style={{ height: 40 }}></View>
          <View style={{ flex: 1, height: "100%" }}>
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          </View>
        </ScreenContainer>
      </BackgroundImage>
    );
  }

  const emptyActionButtons: EmptyListButton[] = [
    {
      icon: <Barcode size={32} color={Colors[colorScheme ?? 'light'].text} />,
      onPress: () => router.push('/(tabs)/scan'),
      text: 'Scan Product'
    },
    {
      icon: <MagnifyingGlass size={32} color={Colors[colorScheme ?? 'light'].text} />,
      onPress: () => router.push('/(tabs)/search'),
      text: 'Search Items'
    }
  ];

  const historyEmptyIcon = <ArrowCounterClockwise size={64} color={Colors[colorScheme ?? 'light'].text} />;

  return (
    <BackgroundImage>
      <ScreenContainer>
        {productState.history.length === 0 ? (
          <EmptyList
            icon={historyEmptyIcon}
            title="No items to analyze"
            text="Scan or search for products to generate a dietary analysis report."
            buttons={emptyActionButtons}
          />
        ) : (
          data && <DietaryAnalysis report={data.report} reportDate={new Date(data.reportDate)} />
        )}
      </ScreenContainer>
    </BackgroundImage>
  );
}

