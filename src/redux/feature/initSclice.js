import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const initUser = createAsyncThunk(
   "init/user",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.profile(id);
         setLoading(false);
         return data;
      } catch (error) {
         console.log(error);
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const initSclice = createSlice({
   name: "init",
   initialState: {
      user: {},
      error: "",
      loading: false,
   },
   extraReducers: {
      //list
      [initUser.pending]: (state, action) => {
         state.loading = true;
      },
      [initUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload;
      },
      [initUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default initSclice;
