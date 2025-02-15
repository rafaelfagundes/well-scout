import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from "expo-image"
import { UserCircleGear } from 'phosphor-react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'

interface ScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
  const colorScheme = useColorScheme()

  const colors = Colors[colorScheme ?? 'light']
  // const logo = colorScheme === 'dark' ? require('../../assets/images/logo-light.svg') : require('../../assets/images/logo-dark.svg')
  const logo = require(`../../assets/images/logo-${colorScheme ?? 'light'}.svg`)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Image
            style={styles.logo}
            source={logo}
          ></Image>
          <TouchableOpacity>
            <UserCircleGear size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View>{children}</View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    height: '100%'
  },
  topHeader: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 151,
    height: 32
  }
});


