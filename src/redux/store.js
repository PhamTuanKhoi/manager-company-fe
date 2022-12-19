import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";
import employeesSclice from "./feature/employeesSclice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSclice from "./feature/authSclice";

const persistConfig = {
   key: "root",
   storage,
};

const reducer = combineReducers({
   auth: authSclice.reducer,
   client: clientSclice.reducer,
   employees: employeesSclice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export const persistor = persistStore(store);
export default store;
