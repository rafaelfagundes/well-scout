import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Swap, Cube, Barcode, Gauge, MagnifyingGlass } from 'phosphor-react-native';


const ICON_SIZE = 32

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: undefined,
        tabBarLabelStyle: {
          marginTop: 5,
          fontFamily: 'SansationBold',
          fontSize: 14
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          margin: 10,
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
        name="swap"
        options={{
          title: 'Swap',
          tabBarIcon: ({ color }) => <Swap color={color} size={ICON_SIZE} />
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
