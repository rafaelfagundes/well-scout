import { Image } from "expo-image"
import { StyleSheet } from "react-native"
import React from 'react'
import { useColorScheme } from "@/hooks/useColorScheme.web"

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
