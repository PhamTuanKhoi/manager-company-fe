import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";
import employeesSclice from "./feature/employeesSclice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSclice from "./feature/authSclice";
import projectSclice from "./feature/projectSclice";
import workerSclice from "./feature/workerSclice";
import payslipSclice from "./feature/payslipSclice";
import workerProjectSclice from "./feature/workerProjectSclice";
import taskSclice from "./feature/taskSclice";

const persistConfig = {
   key: "root",
   storage,
};

const reducer = combineReducers({
   auth: authSclice.reducer,
   client: clientSclice.reducer,
   employees: employeesSclice.reducer,
   project: projectSclice.reducer,
   worker: workerSclice.reducer,
   payslip: payslipSclice.reducer,
   workerProject: workerProjectSclice.reducer,
   task: taskSclice.reducer,
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
