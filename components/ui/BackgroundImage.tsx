import { StyleSheet } from "react-native"
import { ImageBackground } from "react-native"

function BackgroundImage({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/images/background-light.png')}
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
