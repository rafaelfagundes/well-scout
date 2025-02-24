import BackgroundImage from '@/components/ui/BackgroundImage';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';

const PreferencesScreen = () => {
  const [apiKey, setApiKey] = useState('');

  //  Ideally, load and save preferences using AsyncStorage (or similar)
  //  For simplicity, this example doesn't include persistent storage.

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
});

export default PreferencesScreen;

