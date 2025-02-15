import { View, StyleSheet } from "react-native"

function BackgroundImage({ children }) {
  return (
    <View
      style={styles.backgroundImage}
    >{children}</View>
  )
}


const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: 'limegreen',
    height: '100%',
    width: '100%'
  }
})

export default BackgroundImage
