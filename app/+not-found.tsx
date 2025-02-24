import { Link, Stack, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { EmptyList } from "@/components/ui/EmptyList";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Barcode, XCircle } from "phosphor-react-native";

export default function NotFoundScreen() {
  const colors = Colors[useColorScheme() ?? 'light'];
  const icon = <XCircle size={64} color={colors.text} />;
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center', // Removed per NoProductView
      // justifyContent: 'center', // Removed per NoProductView
      paddingHorizontal: 16, // Added per NoProductView
    },
  });

  const buttons = [
    {
      icon: <Barcode size={32} color={colors.text} />,
      onPress: () => router.back(),
      text: 'Go Back'
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerBackTitle: "Back" }} />
      <View style={styles.container}>
        <EmptyList
          icon={icon}
          title="Page Not Found"
          text="This screen doesn't exist."
          buttons={buttons}
        />
      </View>
    </>
  );
}
