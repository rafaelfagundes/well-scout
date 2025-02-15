import { StyleSheet } from "react-native"
import { ImageBackground } from "react-native"
import { useColorScheme } from "../../hooks/useColorScheme"

function BackgroundImage({ children }) {
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
