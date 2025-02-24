import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { MagnifyingGlass, XCircle } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface SearchBarProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChangeText, onSubmitEditing }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      height: 40,
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
      fontWeight: 'bold',
      fontSize: 15
    },
    clearButton: {
      marginLeft: 8,
    }
  });

  return (
    <View style={styles.container}>
      <MagnifyingGlass size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
      {searchText !== "" && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            onChangeText('');
          }}
        >
          <XCircle size={24} weight="fill" color={Colors[colorScheme ?? 'light'].text + '66'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
