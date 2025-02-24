import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { EmptyList } from "@/components/ui/EmptyList";
import { Colors } from "@/constants/Colors";
import { ArrowBendUpLeft, XCircle } from "phosphor-react-native";
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function NotFoundScreen() {
  const colors = Colors[useColorScheme() ?? 'light'];
  const icon = <XCircle size={64} color={colors.text} />;
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });

  const buttons = [
    {
      icon: <ArrowBendUpLeft size={32} color={colors.text} />,
      onPress: () => router.back(),
      text: 'Go Back'
    },
  ];

  return (
    <BackgroundImage>
      <Stack.Screen options={{ title: 'Not Found', headerBackTitle: "Back" }} />
      <View style={styles.container}>
        <EmptyList
          icon={icon}
          title="Page Not Found"
          text="This screen doesn't exist."
          buttons={buttons}
        />
      </View>
    </BackgroundImage>
  );
}
