import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import slideReducer from './slices/slide.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    slide: slideReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
