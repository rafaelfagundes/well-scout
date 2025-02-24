import { RootState } from "@/state/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

export interface Preferences {
  theme: string;
  language: string;
  notificationsEnabled: boolean;
}

const initialState: Preferences = {
  theme: "light",
  language: "en",
  notificationsEnabled: true,
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
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      savePreferencesToAsyncStorage(state);
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      savePreferencesToAsyncStorage(state);
    },
    toggleNotificationsEnabled: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
      savePreferencesToAsyncStorage(state);
    },
    setInitialPreferences: (state, action: PayloadAction<Preferences>) => {
      state.theme = action.payload.theme;
      state.language = action.payload.language;
      state.notificationsEnabled = action.payload.notificationsEnabled;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  toggleNotificationsEnabled,
  setInitialPreferences,
} = preferencesSlice.actions;

export const selectTheme = (state: RootState) => state.preferences.theme;
export const selectLanguage = (state: RootState) => state.preferences.language;
export const selectNotificationsEnabled = (state: RootState) =>
  state.preferences.notificationsEnabled;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const initializePreferencesState = (): AppThunk<Promise<void>> => async (dispatch) => {
    const loadedPreferences = await loadPreferencesFromAsyncStorage();
    dispatch(setInitialPreferences(loadedPreferences));
  }

export default preferencesSlice.reducer;
