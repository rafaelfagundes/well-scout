import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { MagnifyingGlass, XCircle } from 'phosphor-react-native'; // Import XCircle
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface SearchBarProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  returnKeyType: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChangeText, onSubmitEditing, returnKeyType }) => {
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
      marginLeft: 8, // Add some spacing
    }
  });
  const [localText, setLocalText] = useState(searchText);

  useEffect(() => {
    setLocalText(searchText);
  }, [searchText]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChangeText(localText);
    }, 300);
    return () => clearTimeout(handler);
  }, [localText]);

  return (
    <View style={styles.container}>
      <MagnifyingGlass size={24} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 8 }} />
      <TextInput
        autoFocus
        style={styles.input}
        placeholder="Search"
        value={localText}
        onChangeText={setLocalText}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />
      {/* Conditionally render the clear button */}
      {localText !== "" && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setLocalText('');
            onChangeText('');
          }}
        >
          <XCircle size={24} weight="fill" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
