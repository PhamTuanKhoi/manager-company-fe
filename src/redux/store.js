import { configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";

const store = configureStore({
   reducer: {
      client: clientSclice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
