import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Text, StyleSheet, useColorScheme, View, TouchableOpacity } from "react-native";

enum Tabs {
  HISTORY = 'history',
  FAVORITES = 'favorites'
}

type ProductsTabsProps = {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export function ProductsTabs({ activeTab, setActiveTab }: ProductsTabsProps) {
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
      fontSize: 15,
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
            activeTab === Tabs.HISTORY ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.HISTORY)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.HISTORY ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === Tabs.FAVORITES ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab(Tabs.FAVORITES)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === Tabs.FAVORITES ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

