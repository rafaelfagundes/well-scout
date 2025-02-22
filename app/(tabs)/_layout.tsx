import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Cube, Barcode, Gauge, MagnifyingGlass, Sparkle } from 'phosphor-react-native';
import { Fonts } from '@/constants/Fonts';


const ICON_SIZE = 32

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].activeTabBarItem,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactiveTabBarItem,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: undefined,
        tabBarLabelStyle: {
          marginTop: 5,
          fontFamily: Fonts.sansSerif,
          fontSize: 14
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          marginHorizontal: 16,
          borderTopWidth: 0
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <Cube color={color} size={ICON_SIZE} />
        }}
      />
      <Tabs.Screen
        name="advisor"
        options={{
          title: 'Advisor',
          tabBarIcon: ({ color }) => <Sparkle color={color} size={ICON_SIZE} />
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <Barcode color={color} size={ICON_SIZE} />
        }}
      />
      <Tabs.Screen
        name="overview"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <Gauge color={color} size={ICON_SIZE} />
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <MagnifyingGlass size={ICON_SIZE} color={color} />
        }}
      />
    </Tabs>
  );
}
