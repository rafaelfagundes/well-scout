import { Image } from "expo-image"
import { StyleSheet, useColorScheme } from "react-native"
import React from 'react'

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
})

function NoImage() {
  const colorScheme = useColorScheme()
  const image = colorScheme === 'dark' ? require('../../assets/images/no-image-dark.svg') : require('../../assets/images/no-image-light.svg')

  return (
    <Image
      style={styles.image}
      source={image}
    />
  )
}

export default NoImage
