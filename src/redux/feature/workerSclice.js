import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createWorker = createAsyncThunk(
   "worker/createWorker",
   async ({ payload, toast, onHide }, { rejectWithValue }) => {
      try {
         const { data } = await userAPI.createWorker(payload);
         toast.success("Thêm dự án thành công");
         onHide();
         return data;
      } catch (error) {
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

// export const listProject = createAsyncThunk(
//    "project/listProject",
//    async (_, { rejectWithValue }) => {
//       try {
//          const { data } = await projectAPI.list();
//          return data;
//       } catch (error) {
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

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
         state.workers.push(action.payload);
      },
      [createWorker.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
   },
});

// export
export default workerSclice;
