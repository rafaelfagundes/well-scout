import { configureStore } from '@reduxjs/toolkit';
import advisorReducer, {
  AdvisorState,
  setLastReport,
  clearLastReport,
  setLoading,
  generateReport,
  initializeAdvisorState,
} from '../../../features/advisor/advisorSlice';
import { ProductState } from '../../../features/products/productSlice'; // Import ProductState
import * as ai from '../../../lib/ai'; // Import the ai module
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DietaryReport } from '../../../features/advisor/DietaryAnalysis';
import preferencesReducer, { setGeminiApiKey } from '../../../features/preferences/preferencesSlice';


// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock the ai module
jest.mock('../../../lib/ai', () => ({
  callGeminiAPI: jest.fn(),
  generatePromptForAdvisor: jest.fn(),
}));

const mockDietaryReport: DietaryReport = {
  reportTitle: 'Test Report',
  introduction: { overview: 'Test overview', disclaimer: 'Test disclaimer' },
  productAnalysis: [],
  overallRecommendations: { recurringIssues: [], healthImprovementStrategies: [] },
  conclusion: 'Test conclusion',
};

const createMockStore = (preloadedState?: { advisor: AdvisorState, product?: ProductState }) => {
  return configureStore({
    reducer: {
      advisor: advisorReducer,
      preferences: preferencesReducer, // Add preferences reducer
      ...(preloadedState?.product ? { product: () => preloadedState.product } : {}),
    },
    preloadedState,
  });
};

describe('advisorSlice', () => {
  let store = createMockStore();

  beforeEach(() => {
    (AsyncStorage.setItem as jest.Mock).mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.removeItem as jest.Mock).mockClear();
    (ai.callGeminiAPI as jest.Mock).mockClear();
    (ai.generatePromptForAdvisor as jest.Mock).mockClear();
    store = createMockStore();
  });

  it('should handle initial state', () => {
    expect(advisorReducer(undefined, { type: 'unknown' })).toEqual({
      lastReport: { report: null, reportDate: null },
      isLoading: false,
    });
  });

  it('should handle setLastReport', () => {
    const reportDate = new Date().toISOString();
    store.dispatch(setLastReport({ report: mockDietaryReport, reportDate }));
    expect(store.getState().advisor.lastReport).toEqual({ report: mockDietaryReport, reportDate });
    // Called once for setting loading state, once for setting report
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should handle clearLastReport', () => {
    store.dispatch(setLastReport({ report: mockDietaryReport, reportDate: new Date().toISOString() }));
    store.dispatch(clearLastReport());
    expect(store.getState().advisor.lastReport).toEqual({ report: null, reportDate: null });
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2); // Called once for set, once for clear
  });

  it('should handle setLoading', () => {
    store.dispatch(setLoading(true));
    expect(store.getState().advisor.isLoading).toBe(true);
    store.dispatch(setLoading(false));
    expect(store.getState().advisor.isLoading).toBe(false);
  });

  it('should handle generateReport - success', async () => {
    const mockProductState: ProductState = { 
      history: [{
        id: '1',
        brandName: 'Test Brand',
        productName: 'Test Product',
        ecoScore: 'A',
        nutriScore: 'A',
        category: "food",
        createdDate: "1",
        productType: 'food',
        imageUrl: 'http://example.com',
        productInfo: {
          productName: "Product 1",
          genericName: "Generic 1",
          brand: "BrandX",
          category: "food",
          image: "image_url",
          nutriscore: "A",
          novaGroup: 1,
          ecoscore: "A",
          ingredients: [],
          additives: [],
          allergens: [],
          nutriments: {},
          servingSize: "100g",
          quantity: "200g",
          packaging: [],
          manufacturingPlaces: [],
          categories: [],
        },
        extraInfo: {
          health: {
            additives: [],
            nutrients: [],
            warnings: [],
          },
          other: {
            isPalmOilFree: "unknown",
          },
        }
      }],
      favorites: []
    };
    (ai.generatePromptForAdvisor as jest.Mock).mockReturnValue('mocked prompt');
    (ai.callGeminiAPI as jest.Mock).mockResolvedValue(JSON.stringify(mockDietaryReport));
    store.dispatch(setGeminiApiKey("test-api-key")); // Set a mock API key

    await store.dispatch(generateReport(mockProductState));

    expect(ai.generatePromptForAdvisor).toHaveBeenCalledWith(expect.anything());  // Check prompt generation
    expect(ai.callGeminiAPI).toHaveBeenCalledWith("test-api-key", 'mocked prompt');  // Check API call
    expect(store.getState().advisor.isLoading).toBe(false);
    expect(store.getState().advisor.lastReport.report).toEqual(mockDietaryReport);
    expect(store.getState().advisor.lastReport.reportDate).toBeDefined();
    // Called once for setting loading state, once for setting report
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should handle generateReport - empty history', async () => {
    const mockProductState: ProductState = { history: [], favorites: [] };
    await store.dispatch(generateReport(mockProductState));
    expect(store.getState().advisor.lastReport).toEqual({ report: null, reportDate: null });
    expect(ai.callGeminiAPI).not.toHaveBeenCalled(); // Ensure API is not called
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1); // Make sure clearReport is called
  });

  it('should handle generateReport - API call failure', async () => {
    const mockProductState: ProductState = {
      history: [{
        id: '1',
        brandName: 'Test Brand',
        productName: 'Test Product',
        ecoScore: 'A',
        nutriScore: 'A',
        category: "food",
        createdDate: "1",
        productType: 'food',
        imageUrl: 'http://example.com',
        productInfo: {
          productName: "Product 1",
          genericName: "Generic 1",
          brand: "BrandX",
          category: "food",
          image: "image_url",
          nutriscore: "A",
          novaGroup: 1,
          ecoscore: "A",
          ingredients: [],
          additives: [],
          allergens: [],
          nutriments: {},
          servingSize: "100g",
          quantity: "200g",
          packaging: [],
          manufacturingPlaces: [],
          categories: [],
        },
        extraInfo: {
          health: {
            additives: [],
            nutrients: [],
            warnings: [],
          },
          other: {
            isPalmOilFree: "unknown",
          },
        }
      }],
      favorites: []
    };
    (ai.generatePromptForAdvisor as jest.Mock).mockReturnValue('mocked prompt');
    (ai.callGeminiAPI as jest.Mock).mockRejectedValue(new Error('API Error'));
    store.dispatch(setGeminiApiKey("test-api-key"));

    await store.dispatch(generateReport(mockProductState));

    expect(ai.generatePromptForAdvisor).toHaveBeenCalled();
    expect(ai.callGeminiAPI).toHaveBeenCalled();
    expect(store.getState().advisor.isLoading).toBe(false);
    expect(store.getState().advisor.lastReport.report).toBeNull(); // Report should not be set
    // AsyncStorage.setItem is called once to clear the report on error
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });


  it('should handle generateReport - no API key', async () => {
    const mockProductState: ProductState = { history: [], favorites: [] };

    // Ensure API key is empty
    store = createMockStore({ advisor: { lastReport: { report: null, reportDate: null }, isLoading: false }, product: mockProductState });
    store.dispatch(setGeminiApiKey(""));

    await store.dispatch(generateReport(mockProductState));

    expect(store.getState().advisor.isLoading).toBe(false);
    expect(ai.callGeminiAPI).not.toHaveBeenCalled();
    // Called once for setting loading state, once for clearing report
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should initialize state from AsyncStorage', async () => {
    const mockAdvisorState: AdvisorState = {
      lastReport: { report: mockDietaryReport, reportDate: new Date().toISOString() },
      isLoading: false,
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockAdvisorState));

    await store.dispatch(initializeAdvisorState());
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@advisorState');
    expect(store.getState().advisor).toEqual(mockAdvisorState);

  });

  it('should return initial state if AsyncStorage is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    await store.dispatch(initializeAdvisorState());

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@advisorState');

    expect(store.getState().advisor).toEqual({
      lastReport: { report: null, reportDate: null },
      isLoading: false,
    });
  });

  it("should return initalState if AsynStorage fails", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error("AsyncStorage Error"));
    await store.dispatch(initializeAdvisorState());
    expect(AsyncStorage.getItem).toHaveBeenCalled();
    expect(store.getState().advisor).toEqual({
      lastReport: { report: null, reportDate: null },
      isLoading: false,
    });
  })

});

