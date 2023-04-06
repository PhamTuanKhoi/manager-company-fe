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

// export const workerProjectClient = createAsyncThunk(
//    "init/workerProjectClient",
//    async ({ query, setLoading }, { rejectWithValue }) => {
//       try {
//          setLoading(true);
//          const { data } = await userAPI.workerProjectClient(query);
//          setLoading(false);
//          return data;
//       } catch (error) {
//          setLoading(false);
//          return rejectWithValue(error.response.data);
//       }
//    }
// );

export const changePassword = createAsyncThunk(
   "init/changePassword",
   async ({ id, payload, setLoading, toast }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.updatePassword(id, payload);
         toast.success(`Mật khẩu đã được thay đổi`);
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

const initSclice = createSlice({
   name: "init",
   initialState: {
      initUser: {},
      socket: {},
      notificationWorker: [],
      error: "",
      loading: false,
   },
   reducers: {
      setSocket: (state, action) => {
         state.socket = action.payload;
      },
   },
   extraReducers: {
      //list
      [initUser.pending]: (state, action) => {
         state.loading = true;
      },
      [initUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.initUser = action.payload;
      },
      [initUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      // [workerProjectClient.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [workerProjectClient.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.notificationWorker = action.payload;
      // },
      // [workerProjectClient.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },

      // change password
      [changePassword.pending]: (state, action) => {
         state.loading = true;
      },
      [changePassword.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [changePassword.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default initSclice;
