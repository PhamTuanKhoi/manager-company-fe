import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createWorker = createAsyncThunk(
   "worker/createWorker",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.createWorker(payload);
         toast.success("Thêm người lao động thành công");
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

export const listWorker = createAsyncThunk(
   "worker/listWorker",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listWorker();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const profileWorker = createAsyncThunk(
   "worker/profileWorker",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.profile(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const workerSclice = createSlice({
   name: "worker",
   initialState: {
      worker: {},
      workers: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [createWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.worker = action.payload;
         state.workers.unshift(action.payload);
      },
      [createWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [listWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.workers = action.payload;
      },
      [listWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [profileWorker.pending]: (state, action) => {
         state.loading = true;
      },
      [profileWorker.fulfilled]: (state, action) => {
         state.loading = false;
         state.worker = action.payload;
      },
      [profileWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default workerSclice;
