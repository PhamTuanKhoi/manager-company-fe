import { configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";
import employeesSclice from "./feature/employeesSclice";

const store = configureStore({
   reducer: {
      client: clientSclice.reducer,
      employees: employeesSclice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
