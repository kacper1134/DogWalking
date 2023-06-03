import { createSlice } from "@reduxjs/toolkit";

const configInititalState = { serverUrl: "localhost:5000" };

const configSlice = createSlice({
  name: "config",
  initialState: configInititalState,
  reducers: {},
});

export default configSlice.reducer;
