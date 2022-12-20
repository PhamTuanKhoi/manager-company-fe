import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";
import { jwtManager } from "../../helpers/jwtManager";

export const login = createAsyncThunk(
   "auth/login",
   async ({ payload, toast, props }, { rejectWithValue }) => {
      try {
         const { data } = await authAPI.login(payload);
         toast.success("Đăng nhập thành công");
         props.history.push("/app/main/dashboard");
         return data;
      } catch (error) {
         console.log(error);
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

export const currentUser = createAsyncThunk("auth/currentUser", async (_, { rejectWithValue }) => {
   try {
      const { data } = await authAPI.me();
      return data;
   } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
   }
});

// export const listClient = createAsyncThunk("client/listClient", async (_, { rejectWithValue }) => {
//    try {
//       const { data } = await userAPI.listClient();
//       return data;
//    } catch (error) {
//       return rejectWithValue(error.response.data);
//    }
// });

const authSclice = createSlice({
   name: "auth",
   initialState: {
      user: {},
      token: "",
      error: "",
      loading: false,
   },
   reducers: {
      logout: (state, action) => {
         jwtManager.clear();
         state.user = "";
      },
   },
   extraReducers: {
      [login.pending]: (state, action) => {
         state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
         state.loading = false;
         jwtManager.set(action.payload.access_token);
         state.user = action.payload.user;
         state.token = action.payload.access_token;
      },
      [login.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //current user
      [currentUser.pending]: (state, action) => {
         state.loading = true;
      },
      [currentUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload;
      },
      [currentUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default authSclice;