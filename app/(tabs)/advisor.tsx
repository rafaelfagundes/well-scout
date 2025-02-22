import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { ProductState } from '@/features/products/productSlice';
import { callGeminiAPI, generatePromptForAdvisor } from '@/lib/ai';
import DietaryAnalysis from '@/features/advisor/DietaryAnalysis';
import { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const simplifiedProducts = createSimplifiedProductList(productState);
        const systemPrompt = generatePromptForAdvisor(simplifiedProducts);
        const data = await callGeminiAPI(systemPrompt);
        setData(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching ", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productState.history]);

  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (isLoading) {
    return <View style={{flex: 1, backgroundColor: 'white'}}><ActivityIndicator size="large" style={styles.activityIndicator} /></View>;
  }

  return (
    <BackgroundImage>
      <ScreenContainer>
        <DietaryAnalysis data={data} />
      </ScreenContainer>
    </BackgroundImage>
  );
}

