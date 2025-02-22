import { StyleSheet, View, Image } from 'react-native'

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
      <Image style={styles.logo} source={require('../../assets/images/advisor-logo.svg')} />
    </View>
  )
}
