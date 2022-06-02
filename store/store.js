import { combineReducers } from "redux";
import appSlice from "./appSlice";
import caloriesSlice from "./caloriesSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
// import storage from "redux-persist/lib/storage";
import storage from "./storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  app: appSlice,
  calories: caloriesSlice,
  user: userSlice,
  admin: adminSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
