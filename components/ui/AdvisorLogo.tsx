import { StyleSheet, useColorScheme, View } from 'react-native'
import { Image } from "expo-image"

export default function AdvisorLogo({ size = 300 }: { size?: number }) {
  const colorScheme = useColorScheme()
  const textLogo = colorScheme === 'dark' ? require('../../assets/images/advisor-text-light.svg') : require('../../assets/images/advisor-text-dark.svg')

  const logoSizes = {
    logo: {
      size: size / 2,
    },
    textLogo: {
      size: (size * 1.08) / 1.3,
    },
  }

  const styles = StyleSheet.create({
    logoContainer: {
      flex: 1,
      width: "100%",
      alignItems: 'center',
      gap: size / 30,
    },
    logo: {
      width: logoSizes.logo.size,
      height: logoSizes.logo.size,
    },
    textLogo: {
      width: logoSizes.textLogo.size,
      height: logoSizes.textLogo.size / 5.785,
    },
  })

  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/advisor-logo.svg')} />
      <Image
        style={styles.textLogo}
        source={textLogo} />
    </View>
  )
}
