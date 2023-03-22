import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authInititalState: AuthSliceState = { isAuthenticated: false };

export interface AuthSliceState {
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: authInititalState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
