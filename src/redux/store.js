import { configureStore } from "@reduxjs/toolkit";
import clientSclice from "./sclice/clientSclice";

const store = configureStore({
   reducer: {
      filters: clientSclice.reducer,
   },
});

export default store;
