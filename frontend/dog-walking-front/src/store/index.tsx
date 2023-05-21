import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import configReducer from "./configSlice";

import authReducer from "./authSlice";
import userApiSlice from "./userApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
