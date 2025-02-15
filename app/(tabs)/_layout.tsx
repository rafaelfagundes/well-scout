import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Swap, Cube, Barcode, Gauge, MagnifyingGlass } from 'phosphor-react-native';


const ICON_SIZE = 32

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{ backgroundColor: "red", height: "100%", width: "100%" }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
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
    </View>
  );
}
