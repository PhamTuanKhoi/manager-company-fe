import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { partAPI } from "../../api/part";

export const createPart = createAsyncThunk(
   "part/createPart",
   async ({ payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.create(payload);
         toast.success("Thêm bộ phận thành công");
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

export const listPartByIdProject = createAsyncThunk(
   "part/listPart",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.listByIdProject(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const checkNotAssignPart = createAsyncThunk(
   "part/checkNotAssignPart",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.checkNotAssignPart(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const addUserToPart = createAsyncThunk(
   "part/addUserToPart",
   async ({ id, payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.updateFiledWorkers(id, payload);
         toast.success(`Thêm người lao động vào bộ phận`);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const partSclice = createSlice({
   name: "part",
   initialState: {
      part: {},
      parts: [],
      userNotAssignPart: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      // create part
      [createPart.pending]: (state, action) => {
         state.loading = true;
      },
      [createPart.fulfilled]: (state, action) => {
         state.loading = false;
         state.parts.push(action.payload);
      },
      [createPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list part by id project
      [listPartByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listPartByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.parts = action.payload;
      },
      [listPartByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // load user not assign part
      [checkNotAssignPart.pending]: (state, action) => {
         state.loading = true;
      },
      [checkNotAssignPart.fulfilled]: (state, action) => {
         state.loading = false;
         state.userNotAssignPart = action.payload;
      },
      [checkNotAssignPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // add user to part
      [addUserToPart.pending]: (state, action) => {
         state.loading = true;
      },
      [addUserToPart.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [addUserToPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default partSclice;
