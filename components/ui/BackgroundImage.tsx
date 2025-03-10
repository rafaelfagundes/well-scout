import { StyleSheet, useColorScheme } from "react-native"
import { ImageBackground } from "react-native"

function BackgroundImage({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme()
  const backgroundImage = colorScheme === 'dark'
    ? require('../../assets/images/background-dark.png')
    : require('../../assets/images/background-light.png')

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%'
  }
})

export default BackgroundImage
