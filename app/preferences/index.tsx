import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';

const PreferencesScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');

  //  Ideally, load and save preferences using AsyncStorage (or similar)
  //  For simplicity, this example doesn't include persistent storage.

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode:</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Gemini API Key:</Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Enter API Key"
          secureTextEntry
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
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
    marginLeft: 20,
  },
});

export default PreferencesScreen;

