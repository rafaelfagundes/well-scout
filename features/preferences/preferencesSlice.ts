import { RootState } from "@/state/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

export interface Preferences {
  geminiApiKey: string;
}

const initialState: Preferences = {
  geminiApiKey: "",
};

const loadPreferencesFromAsyncStorage = async (): Promise<Preferences> => {
  try {
    const serializedPreferences = await AsyncStorage.getItem("@preferences");
    if (serializedPreferences === null) {
      return initialState;
    }
    return JSON.parse(serializedPreferences);
  } catch (error) {
    console.error("Failed to load preferences from Async Storage:", error);
    return initialState;
  }
};

const savePreferencesToAsyncStorage = async (preferences: Preferences) => {
  try {
    const serializedPreferences = JSON.stringify(preferences);
    await AsyncStorage.setItem("@preferences", serializedPreferences);
  } catch (error) {
    console.error("Failed to save preferences to Async Storage:", error);
  }
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setGeminiApiKey: (state, action: PayloadAction<string>) => {
      state.geminiApiKey = action.payload;
      savePreferencesToAsyncStorage(state);
    },
    setInitialPreferences: (state, action: PayloadAction<Preferences>) => {
      state.geminiApiKey = action.payload.geminiApiKey;
    },
  },
});

export const {
  setGeminiApiKey,
  setInitialPreferences,
} = preferencesSlice.actions;

export const selectGeminiApiKey = (state: RootState) => state.preferences.geminiApiKey;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const initializePreferencesState = (): AppThunk<Promise<void>> => async (dispatch) => {
  const loadedPreferences = await loadPreferencesFromAsyncStorage();
  dispatch(setInitialPreferences(loadedPreferences));
}

export default preferencesSlice.reducer;
