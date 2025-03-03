import BackgroundImage from '@/components/ui/BackgroundImage';
import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useDispatch, useSelector } from 'react-redux';
import { selectGeminiApiKey, setGeminiApiKey, initializePreferencesState } from '@/features/preferences/preferencesSlice';
import type { AppDispatch } from '@/state/store';
import { Stack } from 'expo-router';

const PreferencesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const geminiApiKey = useSelector(selectGeminiApiKey);

  useEffect(() => {
    dispatch(initializePreferencesState());
  }, [dispatch]);

  const colors = Colors[useColorScheme() ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    settingItem: {
      backgroundColor: colors.background,
      borderRadius: 12,
      elevation: 3,
      overflow: 'hidden',
      padding: 16
    },
    settingText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '600',
      fontFamily: Fonts.sansSerif,
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: colors.text + '11',
      borderRadius: 4,
      paddingHorizontal: 10,
      color: colors.text,
      backgroundColor: colors.inputOnCard,
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      fontFamily: Fonts.sansSerif,
    },
    itemFootnote: {
      fontSize: 12,
      lineHeight: 16,
      color: colors.text,
      opacity: 0.8,
      fontStyle: 'italic',
      fontFamily: Fonts.sansSerif,
      paddingHorizontal: 16,
      marginTop: 4
    },
  });

  return (
    <BackgroundImage>
      <Stack.Screen options={{ title: 'Preferences', headerBackTitle: "Back" }} />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>AI Advisor</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Gemini API Key</Text>
          <TextInput
            style={styles.input}
            value={geminiApiKey}
            onChangeText={(text) => {
              dispatch(setGeminiApiKey(text));
            }}
            placeholder="Enter API Key"
            secureTextEntry
          />
        </View>
        <Text style={styles.itemFootnote}>In order to use the AI Advisor, you need to set up a Google Gemini API key. You can get one at aistudio.google.com for free.</Text>
      </View>
    </BackgroundImage>
  );
};

export default PreferencesScreen;
