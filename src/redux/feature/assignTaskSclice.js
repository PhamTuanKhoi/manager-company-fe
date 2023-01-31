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

export const listAssignTask = createAsyncThunk(
   "assignTask/listAssignTask",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listAssignByTask = createAsyncThunk(
   "assignTask/listAssignByTask",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.listByTask(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

export const checkNotAssignTask = createAsyncThunk(
   "assignTask/checkNotAssignTask",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await assignTaskAPI.checkNotAssignTask(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         console.log(error);
         return rejectWithValue(error.response.data);
      }
   }
);

const assignTaskSclice = createSlice({
   name: "assignTask",
   initialState: {
      assignTask: {},
      assignTasks: [],
      notAssignTask: [],
      assignTaskByTask: [],
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
         state.assignTaskByTask.push(action.payload);
      },
      [createAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [listAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [listAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTasks = action.payload;
      },
      [listAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list by task
      [listAssignByTask.pending]: (state, action) => {
         state.loading = true;
      },
      [listAssignByTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.assignTaskByTask = action.payload;
      },
      [listAssignByTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list by task
      [checkNotAssignTask.pending]: (state, action) => {
         state.loading = true;
      },
      [checkNotAssignTask.fulfilled]: (state, action) => {
         state.loading = false;
         state.notAssignTask = action.payload;
      },
      [checkNotAssignTask.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default assignTaskSclice;
