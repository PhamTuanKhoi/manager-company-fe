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

export const precentPartByIdProject = createAsyncThunk(
   "part/precentPartByIdProject",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.precentPartByIdProject(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const removeUserInPart = createAsyncThunk(
   "part/removeUserInPart",
   async ({ partId, userId, setLoading, toast, setUserEX, userEX }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await partAPI.removeUserInPart(partId, userId);
         setUserEX(userEX.filter((val) => val._id !== userId));
         toast.success(`removed a user in part ${data?.name}`);
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

const partSclice = createSlice({
   name: "part",
   initialState: {
      part: {},
      parts: [],
      userNotAssignPart: [],
      precentPart: [],
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

         const {
            arg: {
               id,
               payload: { userId },
            },
         } = action.meta;

         // delete user
         state.userNotAssignPart = state.userNotAssignPart.filter((item) => item.userId !== userId);

         // update parts
         state.parts = state.parts?.map((item) =>
            item._id === id ? { ...item, workers: [...item.workers, userId] } : item
         );
      },
      [addUserToPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // load user not assign part
      [precentPartByIdProject.pending]: (state, action) => {
         state.loading = true;
      },
      [precentPartByIdProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.precentPart = action.payload;
      },
      [precentPartByIdProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove user in part
      [removeUserInPart.pending]: (state, action) => {
         state.loading = true;
      },
      [removeUserInPart.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [removeUserInPart.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default partSclice;
