import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectAPI } from "../../api/project";

export const createProject = createAsyncThunk(
   "project/createProject",
   async ({ payload, toast, onHide }, { rejectWithValue }) => {
      try {
         const { data } = await projectAPI.createProject(payload);
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

export const listProject = createAsyncThunk(
   "project/listProject",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await projectAPI.list();
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

const projectSclice = createSlice({
   name: "project",
   initialState: {
      project: {},
      Projects: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createProject.pending]: (state, action) => {
         state.loading = true;
      },
      [createProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.project = action.payload;
         state.projects.push(action.payload);
      },
      [createProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listProject.pending]: (state, action) => {
         state.loading = true;
      },
      [listProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.projects = action.payload;
      },
      [listProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default projectSclice;
