import { RootState } from "@/state/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { ExtraInformation, ProductInfo } from "./Product";

export interface ProductItem {
  id: string;
  ecoScore: string;
  nutriScore: string;
  imageUrl: string;
  brandName: string;
  productName: string;
  category: string;
  productType: "food" | "beauty" | "pet" | "other";
  createdDate: string;
  productInfo: ProductInfo;
  extraInfo: ExtraInformation;
}

export interface ProductState {
  history: ProductItem[];
  favorites: ProductItem[]
}

const initialState: ProductState = {
  history: [],
  favorites: []
}

const saveStateToAsyncStorage = async (state: ProductState) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('@productState', serializedState);
  } catch (error) {
    console.error('Failed to save product state to Async Storage:', error);
  }
};

const loadStateFromAsyncStorage = async (): Promise<ProductState> => {
  try {
    const serializedState = await AsyncStorage.getItem('@productState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load product state from Async Storage:', error);
    return initialState;
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProductToHistory: (state, action: PayloadAction<ProductItem>) => {
      const existingIndex = state.history.findIndex(product => product.id === action.payload.id);
      if (existingIndex !== -1) {
        state.history[existingIndex] = action.payload;
      } else {
        state.history.push(action.payload);
      }
      saveStateToAsyncStorage(state);
    },
    removeProductFromHistory: (state, action: PayloadAction<ProductItem>) => {
      state.history = state.history.filter(item => item.id !== action.payload.id);
      saveStateToAsyncStorage(state);
    },
    addProductToFavorites: (state, action: PayloadAction<ProductItem>) => {
      const existingIndex = state.favorites.findIndex(product => product.id === action.payload.id);
      if (existingIndex === -1) {
        state.favorites.push(action.payload);
        saveStateToAsyncStorage(state);
      }
    },
    removeProductFromFavorites: (state, action: PayloadAction<ProductItem>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      saveStateToAsyncStorage(state);
    },
    setInitialState: (state, action: PayloadAction<ProductState>) => {
      state.history = action.payload.history;
      state.favorites = action.payload.favorites;
    }
  }
});

export const { addProductToHistory, removeProductFromHistory, addProductToFavorites, removeProductFromFavorites, setInitialState } = productSlice.actions;
export const selectProductHistory = (state: RootState) => state.product.history;
export const selectProductFavorites = (state: RootState) => state.product.favorites;
export default productSlice.reducer;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const initializeProductState = (): AppThunk<Promise<void>> => async (dispatch) => {
  const loadedState = await loadStateFromAsyncStorage();
  dispatch(setInitialState(loadedState));
}

export const resetStorage = (): AppThunk<Promise<void>> => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('@productState');
  } catch (error) {
    console.error('Failed to reset product state in Async Storage:', error);
  }
  dispatch(setInitialState(initialState));
}
