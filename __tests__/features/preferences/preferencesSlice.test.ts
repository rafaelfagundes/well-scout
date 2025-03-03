import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer, {
  Preferences,
  setGeminiApiKey,
  initializePreferencesState
} from '../../../features/preferences/preferencesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const createMockStore = (preloadedState?: { preferences: Preferences }) => {
  return configureStore({
    reducer: {
      preferences: preferencesReducer,
    },
    preloadedState,
  });
};

describe('preferencesSlice', () => {
  let store = createMockStore();
  beforeEach(() => {
    (AsyncStorage.setItem as jest.Mock).mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    store = createMockStore()
  });


  it('should handle initial state', () => {
    expect(preferencesReducer(undefined, { type: 'unknown' })).toEqual({
      geminiApiKey: '',
    });
  });

  it('should handle setGeminiApiKey', () => {
    store.dispatch(setGeminiApiKey('test-api-key'));
    expect(store.getState().preferences.geminiApiKey).toBe('test-api-key');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@preferences', JSON.stringify({ geminiApiKey: 'test-api-key' }));

  });

  it('should initialize state from AsyncStorage', async () => {
    const mockPreferences: Preferences = { geminiApiKey: 'stored-api-key' };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockPreferences));

    await store.dispatch(initializePreferencesState());
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@preferences');
    expect(store.getState().preferences).toEqual(mockPreferences);
  });

  it('should return the initial state if no preferences are found in AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await store.dispatch(initializePreferencesState());
    expect(AsyncStorage.getItem).toHaveBeenCalled();
    expect(store.getState().preferences.geminiApiKey).toEqual("");
  });

  it("should handle errors when loading preferences", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error("AsyncStorage failure"));
    await store.dispatch(initializePreferencesState());
    expect(AsyncStorage.getItem).toHaveBeenCalled();
    expect(store.getState().preferences.geminiApiKey).toBe("");
  })
});
