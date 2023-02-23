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

export const createAttendance = createAsyncThunk(
   "attendance/createAttendance",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await attendanceAPI.create(payload);
         toast.success(`Đã chấm công wiffi ${payload?.wiffi}`);
         onHide();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         if (typeof error?.response?.data?.message === "string") {
            toast.error(error?.response?.data?.message);
         } else {
            error?.response?.data?.message?.forEach((item) => {
               toast.error(item);
            });
         }
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
      //create wiffi
      [createAttendance.pending]: (state, action) => {
         state.loading = true;
      },
      [createAttendance.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createAttendance.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default attendanceSclice;
