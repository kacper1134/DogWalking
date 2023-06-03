import { createSlice } from "@reduxjs/toolkit";

const authInititalState: AuthSliceState = { isAuthenticated: false, username: "" };

export interface AuthSliceState {
  isAuthenticated: boolean;
  username: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: authInititalState,
  reducers: {
    login: (state, props) => {
      state.username = props.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
