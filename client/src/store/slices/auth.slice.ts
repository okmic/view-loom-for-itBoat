import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  authStatus: "auth" | "notAuth" | "loading"
}

const initialState: AuthState = {
  authStatus: "loading"
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.authStatus = "notAuth"
      localStorage.removeItem('token')
    },
    authStatus(state, action: PayloadAction<{status: AuthState["authStatus"] }>) {
       state.authStatus = action.payload.status
    }
  }
})

export const { logout, authStatus } = authSlice.actions
export default authSlice.reducer
