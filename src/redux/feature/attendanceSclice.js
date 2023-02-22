import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { attendanceAPI } from "../../api/attendance";

export const fetchWiffi = createAsyncThunk(
   "attendance/fetchWiffi",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.fetchWiffi();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const attendanceSclice = createSlice({
   name: "attendance",
   initialState: {
      attendance: {},
      attendances: [],
      wiffi: [],
      error: "",
      loading: false,
   },
   reducers: {
      learWiffi: (state, action) => {
         state.wiffi = [];
      },
   },
   extraReducers: {
      //list wiffi
      [fetchWiffi.pending]: (state, action) => {
         state.loading = true;
      },
      [fetchWiffi.fulfilled]: (state, action) => {
         state.loading = false;
         state.wiffi = action.payload;
      },
      [fetchWiffi.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default attendanceSclice;
