import { configureStore } from '@reduxjs/toolkit'
import productReducer from '@/features/products/productSlice'
import advisorReducer from '@/features/advisor/advisorSlice'
import preferencesReducer from '@/features/preferences/preferencesSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    advisor: advisorReducer,
    preferences: preferencesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSotre = typeof store;
