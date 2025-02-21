import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Text, StyleSheet, useColorScheme, View, TouchableOpacity } from "react-native";

export enum Tabs {
  FOOD = 'food',
  BEAUTY = 'beauty',
  PETS = 'pets',
}

type ProductsTabsProps = {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export function CategoryTabs({ activeTab, setActiveTab }: ProductsTabsProps) {
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const activeTabColor = Colors[colorScheme ?? 'light'].tint;
  const activeTabTextColor = Colors[colorScheme ?? 'light'].tintConstrast;
  const inactiveTabTextColor = Colors[colorScheme ?? 'light'].text;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      padding: 4,
      borderRadius: 20,
      height: 40,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 32,
      borderRadius: 25,
    },
    tabText: {
      fontFamily: Fonts.sansSerif,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
    inactiveTab: {
      backgroundColor: 'transparent',
    },
    inactiveTabText: {
      color: inactiveTabTextColor,
    },
    activeTab: {
      backgroundColor: activeTabColor,
    },
    activeTabText: {
      color: activeTabTextColor,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.FOOD ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.FOOD)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.FOOD ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            Food
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.BEAUTY ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.BEAUTY)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.BEAUTY ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            Beauty
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.PETS ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.PETS)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.PETS ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            Pets
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

