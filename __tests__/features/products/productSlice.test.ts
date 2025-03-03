import { configureStore } from '@reduxjs/toolkit';
import productReducer, {
  addProductToHistory,
  removeProductFromHistory,
  addProductToFavorites,
  removeProductFromFavorites,
  ProductState,
  ProductItem
} from '../../../features/products/productSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const createMockStore = (preloadedState?: ProductState) => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
    preloadedState,
  });
};


const mockProduct1: ProductItem = {
  id: '123',
  ecoScore: 'a',
  nutriScore: 'b',
  imageUrl: 'http://example.com/image1.jpg',
  brandName: 'Brand 1',
  productName: 'Product 1',
  category: 'food',
  productType: 'food',
  createdDate: new Date().toISOString(),
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
};

const mockProduct2: ProductItem = {
  id: '456',
  ecoScore: 'c',
  nutriScore: 'd',
  imageUrl: 'http://example.com/image2.jpg',
  brandName: 'Brand 2',
  productName: 'Product 2',
  category: 'food',
  productType: 'food',
  createdDate: new Date().toISOString(),
  productInfo: {
    productName: "Product 2",
    genericName: "Generic 2",
    brand: "BrandY",
    category: "food",
    image: "image_url",
    nutriscore: "B",
    novaGroup: 2,
    ecoscore: "B",
    ingredients: [],
    additives: [],
    allergens: [],
    nutriments: {},
    servingSize: "200g",
    quantity: "400g",
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
};


describe('productSlice', () => {
  let store = createMockStore();

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (AsyncStorage.setItem as jest.Mock).mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.removeItem as jest.Mock).mockClear();
    store = createMockStore();
  });


  it('should handle initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual({
      history: [],
      favorites: [],
    });
  });

  it('should handle addProductToHistory', () => {
    store.dispatch(addProductToHistory(mockProduct1));
    expect(store.getState().product.history).toContain(mockProduct1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should replace existing product in history if it already exists', () => {
    store.dispatch(addProductToHistory(mockProduct1)); // add once
    store.dispatch(addProductToHistory(mockProduct1)); // add again

    expect(store.getState().product.history.length).toEqual(1)
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });


  it('should handle removeProductFromHistory', () => {
    store.dispatch(addProductToHistory(mockProduct1));
    store.dispatch(removeProductFromHistory(mockProduct1));
    expect(store.getState().product.history).not.toContain(mockProduct1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should handle addProductToFavorites', () => {
    store.dispatch(addProductToFavorites(mockProduct2));
    expect(store.getState().product.favorites).toContain(mockProduct2);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("should not add a favorite product twice", () => {
    store.dispatch(addProductToFavorites(mockProduct2));
    store.dispatch(addProductToFavorites(mockProduct2));
    expect(store.getState().product.favorites).toEqual([mockProduct2]);
  });


  it('should handle removeProductFromFavorites', () => {
    store.dispatch(addProductToFavorites(mockProduct2));
    store.dispatch(removeProductFromFavorites(mockProduct2));
    expect(store.getState().product.favorites).not.toContain(mockProduct2);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  });

});
