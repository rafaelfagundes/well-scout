import { Image } from "expo-image"
import { StyleSheet, useColorScheme } from "react-native"
import React from 'react'


function NoImage({ imageSize = 70 }: { imageSize?: number }) {
  const colorScheme = useColorScheme()
  const image = colorScheme === 'dark' ? require('../../assets/images/no-image-dark.svg') : require('../../assets/images/no-image-light.svg')

  const styles = StyleSheet.create({
    image: {
      width: imageSize,
      height: imageSize,
    },
  })
  return (
    <Image
      style={styles.image}
      source={image}
    />
  )
}

export default NoImage
