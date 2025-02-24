import { Image } from "expo-image"
import { StyleSheet } from "react-native"
import React from 'react'

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
})

function NoImage() {
  return (
    <Image
      style={styles.image}
      source={require('../../assets/images/no-image.svg')}
    />
  )
}

export default NoImage
