import BackgroundImage from '@/components/ui/BackgroundImage';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

const PreferencesScreen = () => {
  const [apiKey, setApiKey] = useState('');

  //  Ideally, load and save preferences using AsyncStorage (or similar)
  //  For simplicity, this example doesn't include persistent storage.

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    settingItem: {
      backgroundColor: Colors[useColorScheme() ?? 'light'].background,
      borderRadius: 12,
      elevation: 3,
      overflow: 'hidden',
      padding: 16
    },
    settingText: {
      fontSize: 16,
      color: Colors[useColorScheme() ?? 'light'].text,
      fontWeight: '600',
      fontFamily: Fonts.sansSerif,
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: Colors[useColorScheme() ?? 'light'].text + '11',
      borderRadius: 4,
      paddingHorizontal: 10,
      color: Colors[useColorScheme() ?? 'light'].text,
      backgroundColor: Colors[useColorScheme() ?? 'light'].inputOnCard,
      fontSize: 16,
    },
  });

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Gemini API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter API Key"
            secureTextEntry
          />
        </View>
      </View>
    </BackgroundImage>
  );
};


export default PreferencesScreen;

