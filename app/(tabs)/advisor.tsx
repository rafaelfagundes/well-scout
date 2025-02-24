import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import { AppDispatch } from '@/state/store';
import { initializeAdvisorState, generateReport } from '@/features/advisor/advisorSlice';
import DietaryAnalysis from '@/features/advisor/DietaryAnalysis';
import { useEffect } from 'react';
import { View } from 'react-native';
import AdvisorLogo from '@/components/ui/AdvisorLogo';
import { Barcode, Key, MagnifyingGlass, SlidersHorizontal, Sparkle } from 'phosphor-react-native';
import { EmptyList, EmptyListButton } from '@/components/ui/EmptyList';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TimedLoading from '@/components/ui/TimedLoading';

export default function AdivisorScreen() {
  const productState = useSelector((state: RootState) => state.product);
  const advisorState = useSelector((state: RootState) => state.advisor);
  const preferencesState = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    dispatch(initializeAdvisorState());
  }, [dispatch]);

  useEffect(() => {
    // Generate report when product history changes
    dispatch(generateReport(productState));
  }, [productState.history]);


  const noApiKeyActionButtons: EmptyListButton[] = [
    {
      icon: <SlidersHorizontal size={32} color={Colors[colorScheme ?? 'light'].text} />,
      onPress: () => router.push('/preferences'),
      text: 'Open Preferences'
    },
  ];

  const noApiKeyEmptyIcon = <Key size={64} color={Colors[colorScheme ?? 'light'].text} />;

  if (preferencesState.geminiApiKey === "") {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <EmptyList
            icon={noApiKeyEmptyIcon}
            title="No API Key"
            text="To use the advisor, you need to set up an API key in the preferences."
            buttons={noApiKeyActionButtons}
          />
        </ScreenContainer>
      </BackgroundImage>
    );
  }

  if (advisorState.isLoading) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <View style={{ height: 20 }}></View>
          <AdvisorLogo size={200} />
          <View style={{ height: 40 }}></View>
          <View style={{ flex: 1, height: "100%" }}>
            <TimedLoading duration={10000} color={colors.tint} trackColor={colors.background} />
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

  const historyEmptyIcon = <Sparkle size={64} color={Colors[colorScheme ?? 'light'].text} />;

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
          advisorState.lastReport.report && <DietaryAnalysis
            report={advisorState.lastReport.report}
            reportDate={new Date(advisorState.lastReport.reportDate ?? '')}
          />
        )}
      </ScreenContainer>
    </BackgroundImage>
  );
}

