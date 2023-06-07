import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import configReducer from "./configSlice";

import authReducer from "./authSlice";
import userApiSlice from "./userApiSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import availabilitiesApiSlice from "./availabilitiesSlice";
import walkApiSlice from "./walkApiSlice";

const store = configureStore({
  reducer: {
    auth: persistReducer(
      { key: "auth", storage: storageSession },
      authReducer
    )!,
    config: configReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [availabilitiesApiSlice.reducerPath]: availabilitiesApiSlice.reducer,
    [walkApiSlice.reducerPath]: walkApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(userApiSlice.middleware)
      .concat(availabilitiesApiSlice.middleware)
      .concat(walkApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
export const persistor = persistStore(store);
