import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { UserCircleGear } from 'phosphor-react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Logo from './Logo'

interface ScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode
  scrollView?: boolean
}

export default function ScreenContainer({ children, scrollView = true }: ScreenContainerProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const tabBarHeight = useBottomTabBarHeight()

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
      height: '100%',
    },
    topHeader: {
      marginTop: 4,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    logo: {
      width: 151,
      height: 32
    },
    children: {
      flex: 1,
      marginBottom: tabBarHeight - 30,
    }
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Logo />
          <TouchableOpacity>
            <UserCircleGear size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
        {scrollView !== false ? (
          <ScrollView style={styles.children}>{children}</ScrollView>
        ) : (
          <View style={styles.children}>{children}</View>
        )}
      </View>
    </SafeAreaView>
  )
}
