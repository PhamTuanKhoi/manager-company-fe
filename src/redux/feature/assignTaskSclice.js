import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assignTaskAPI } from "../../api/assignTask";

export const createAssignTask = createAsyncThunk(
   "assignTask/createAssignTask",
   async ({ payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.createAssign(payload);
         toast.success("Giao công việc thành công");
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

const assignTaskSclice = createSlice({
   name: "assignTask",
   initialState: {
      assignTask: {},
      assignTasks: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      //assign
      [createAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [createAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTask = action.payload;
         state.assignTasks.push(action.payload);
      },
      [createAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default assignTaskSclice;
