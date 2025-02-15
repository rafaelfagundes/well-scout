import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from "expo-image"
import { UserCircleGear } from 'phosphor-react-native'

interface ScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-dark.svg')}
          ></Image>
          <TouchableOpacity>
            <UserCircleGear size={32} />
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


