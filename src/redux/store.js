import { configureStore } from "@reduxjs/toolkit";
import clientSclice from "./feature/clientSclice";

const store = configureStore({
   reducer: {
      filters: clientSclice.reducer,
   },
});

export default store;
