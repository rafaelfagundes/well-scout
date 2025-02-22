import { Image } from "expo-image"
import { StyleSheet, useColorScheme } from "react-native"
import React from 'react'

const styles = StyleSheet.create({
  logo: {
    width: 151,
    height: 32
  },
})

function Logo() {
  const colorScheme = useColorScheme()
  const logo = colorScheme === 'dark' ? require('../../assets/images/logo-light.svg') : require('../../assets/images/logo-dark.svg')

  return (
    <Image
      style={styles.logo}
      source={logo}
    ></Image>
  )
}

export default Logo
