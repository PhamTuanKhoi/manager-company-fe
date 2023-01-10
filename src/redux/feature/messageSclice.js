import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { massageAPI } from "../../api/message";

export const listMessage = createAsyncThunk(
   "message/listMessage",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await massageAPI.chatDouble(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const messageSclice = createSlice({
   name: "message",
   initialState: {
      message: {},
      messages: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      //list
      [listMessage.pending]: (state, action) => {
         state.loading = true;
      },
      [listMessage.fulfilled]: (state, action) => {
         state.loading = false;
         state.messages = action.payload;
      },
      [listMessage.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default messageSclice;
