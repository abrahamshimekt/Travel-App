import { configureStore } from '@reduxjs/toolkit'
import signupSlice from "./features/auth/signupSlice"
import loginSlice from "./features/auth/loginSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      signup:signupSlice,
      login:loginSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']