import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
   name: "filters",
   initialState: {
      client: {},
      clients: [],
   },
   reducers: {
      create: (state, action) => {
         // mutation || IMMER
         state.client = action.payload;
      },
   },
});
