import { Colors } from "@/constants/Colors";
import { Barcode, ListMagnifyingGlass } from "phosphor-react-native";
import BackgroundImage from "./BackgroundImage";
import { View, StyleSheet, useColorScheme } from "react-native";
import { EmptyList } from "./EmptyList";
import { useRouter } from "expo-router";

export function NoProductView() {
  const colors = Colors[useColorScheme() ?? 'light'];
  const icon = <ListMagnifyingGlass size={64} color={colors.text} />;
  const router = useRouter();

  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingHorizontal: 16,
    },
  });

  const buttons = [
    {
      icon: <Barcode size={32} color={colors.text} />,
      onPress: () => router.back(),
      text: 'Go Back to Scan'
    },
  ];

  return (
    <BackgroundImage>
      <View style={styles.centered}>
        <EmptyList icon={icon} title="Product Not Found" text="We couldn't find the product you're looking for. Please try again with a different product." buttons={buttons} />
      </View>
    </BackgroundImage>
  );
}

