import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { UserCircleGear } from 'phosphor-react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Logo from './Logo'


interface ExtraButton {
  icon: React.ReactNode,
  onPress: () => void
}

interface ScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode
  scrollView?: boolean,
  horizontalPadding?: boolean,
  extraButtons?: ExtraButton[]
}

export default function ScreenContainer({ children, scrollView = true, horizontalPadding = true, extraButtons = [] }: ScreenContainerProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const tabBarHeight = useBottomTabBarHeight()

  function getHeaderButtonsViewSize() {
    if (extraButtons.length === 0) {
      return 32
    }
    else return extraButtons.length >= 1 ? 74 * extraButtons.length : 32
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    topHeader: {
      marginTop: 4,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    logo: {
      width: 151,
      height: 32
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: getHeaderButtonsViewSize()
    },
    children: {
      flex: 1,
      marginBottom: tabBarHeight - 24,
      paddingHorizontal: horizontalPadding ? 16 : 0,
    }
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Logo />
          <View style={styles.headerButtons}>
            {extraButtons.map((button, index) => (
              <TouchableOpacity key={index} onPress={button.onPress}>
                {button.icon}
              </TouchableOpacity>
            ))}
            <TouchableOpacity>
              <UserCircleGear size={32} color={colors.text} />
            </TouchableOpacity>
          </View>
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
