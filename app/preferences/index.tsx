import BackgroundImage from '@/components/ui/BackgroundImage';
import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setLanguage, setTheme, initializePreferencesState } from '@/features/preferences/preferencesSlice';
import { RootState } from '@/state/store';
import type { AppDispatch } from '@/state/store';

const PreferencesScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.preferences.theme);
    // const language = useSelector(selectLanguage); // Example if you add more

    useEffect(() => {
        dispatch(initializePreferencesState());
    }, [dispatch]);

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
                        // Replace with a selector if you add API key to preferencesSlice
                        value={""}
                        onChangeText={(text) => {
                            // Dispatch an action to update the API key in preferencesSlice
                        }}
                        placeholder="Enter API Key"
                        secureTextEntry
                    />
                </View>
            </View>
        </BackgroundImage>
    );
};

export default PreferencesScreen;
