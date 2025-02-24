import { RootState } from "@/state/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { callGeminiAPI, generatePromptForAdvisor } from "@/lib/ai";
import { ProductState } from "@/features/products/productSlice";
import { DietaryReport } from "./DietaryAnalysis";
import { selectGeminiApiKey } from "../preferences/preferencesSlice";

export interface AdvisorState {
  lastReport: {
    report: DietaryReport | null;
    reportDate: string | null;
  };
  isLoading: boolean;
}

const initialState: AdvisorState = {
  lastReport: {
    report: null,
    reportDate: null
  },
  isLoading: false
};

// Async Storage functions
const saveAdvisorStateToAsyncStorage = async (state: AdvisorState) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('@advisorState', serializedState);
  } catch (error) {
    console.error('Failed to save advisor state to Async Storage:', error);
  }
};

const loadAdvisorStateFromAsyncStorage = async (): Promise<AdvisorState> => {
  try {
    const serializedState = await AsyncStorage.getItem('@advisorState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load advisor state from Async Storage:', error);
    return initialState;
  }
};

const advisorSlice = createSlice({
  name: 'advisor',
  initialState,
  reducers: {
    setLastReport: (state, action: PayloadAction<{ report: DietaryReport; reportDate: string }>) => {
      state.lastReport = action.payload;
      saveAdvisorStateToAsyncStorage(state);
    },
    clearLastReport: (state) => {
      state.lastReport = { report: null, reportDate: null };
      saveAdvisorStateToAsyncStorage(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialState: (state, action: PayloadAction<AdvisorState>) => {
      return action.payload;
    }
  }
});

export const { setLastReport, clearLastReport, setLoading, setInitialState } = advisorSlice.actions;

// Thunk action to generate and save report
export const generateReport = (productState: ProductState): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch, getState) => { // Use getState
  try {
    dispatch(setLoading(true));

    if (productState.history.length === 0) {
      dispatch(clearLastReport());
      return;
    }

    const simplifiedProducts = createSimplifiedProductList(productState);
    const systemPrompt = generatePromptForAdvisor(simplifiedProducts);

    const geminiApiKey = selectGeminiApiKey(getState()); // Get API key from state
    if (geminiApiKey === "") {
      dispatch(setLoading(false));
      throw new Error("Advisor: No API key provided.")
    };

    const data = await callGeminiAPI(geminiApiKey, systemPrompt); // Pass API key

    dispatch(setLastReport({
      report: JSON.parse(data),
      reportDate: new Date().toISOString()
    }));
  } catch (error) {
    console.error("Error generating report: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Helper function to convert product state (move this from advisor.tsx)
function createSimplifiedProductList(originalJson: ProductState) {
  // Extract the history array containing product data
  const products = originalJson.history;

  // Map each product to a simplified object
  const simplifiedProducts = products.map(product => {
    const productInfo = product.productInfo;
    const extraInfo = product.extraInfo;

    // Determine if the product is a solid or liquid for nutrimentsPer (heuristic based on category)
    const isLiquid = productInfo.category.toLowerCase().includes('beverage') ||
      productInfo.category.toLowerCase().includes('drink') ||
      productInfo.quantity.toLowerCase().includes('ml') ||
      productInfo.quantity.toLowerCase().includes('l');
    const nutrimentsPer = isLiquid ? '100ml' : '100g';

    // Extract ingredients as a simple array of text
    const ingredients = productInfo.ingredients.map(ingredient => ingredient.text);

    // Standardize energy fields in nutriments
    const nutriments = {
      ...productInfo.nutriments,
      energyKj: productInfo.nutriments.energy || productInfo.nutriments.energyKj,
      energyKcal: productInfo.nutriments.energyKcal
    };
    delete nutriments.energy; // Remove ambiguous "energy" field if present

    // Extract health warnings
    const healthWarnings = extraInfo.health.warnings.map(warning => warning.text);

    return {
      productName: productInfo.productName,
      brand: productInfo.brand,
      ingredients: ingredients,
      nutrimentsPer: nutrimentsPer,
      nutriments: nutriments,
      allergens: productInfo.allergens,
      additives: productInfo.additives,
      nutriScore: productInfo.nutriscore,
      ecoScore: productInfo.ecoscore,
      novaGroup: productInfo.novaGroup,
      servingSize: productInfo.servingSize,
      quantity: productInfo.quantity,
      healthWarnings: healthWarnings
    };
  });

  // Return the array of simplified product objects
  return simplifiedProducts;
}

// Initialize state from storage
export const initializeAdvisorState = (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  const loadedState = await loadAdvisorStateFromAsyncStorage();
  dispatch(setInitialState(loadedState));
};

export default advisorSlice.reducer;
