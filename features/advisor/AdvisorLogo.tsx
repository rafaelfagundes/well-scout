import { StyleSheet, View } from 'react-native'
import { SvgUri } from 'react-native-svg';

export default function AdvisorLogo() {
  const styles = StyleSheet.create({
    logoContainer: {
    },
    logo: {
      width: 100,
      height: 100
    },
  })

  return (
    <View style={styles.logoContainer}>
      <SvgUri
        style={styles.logo}
        uri={require('../../assets/images/advisor-logo.svg').uri} />
    </View>
  )
}
