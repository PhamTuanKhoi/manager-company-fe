import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
   name: "client",
   initialState: {
      client: {},
      clients: [],
   },
   reducers: {
      create: (state, action) => {
         // mutation || IMMER
         state.clients.push(action.payload);
         state.client = action.payload;
         console.log(state.client, state.clients, "sytar");
         return state;
      },

      list: async (state, action) => {
         state.clients = action.payload;
      },
   },
});
