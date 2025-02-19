import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';

interface SearchBarProps {
  searchText: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChangeText }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor + 'D9',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginTop: 10,
    },
    input: {
      flex: 1,
      height: 40,
      color: Colors[colorScheme ?? 'light'].text,
    },
  });
  return (
    <View style={styles.container}>
      <MagnifyingGlass size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
