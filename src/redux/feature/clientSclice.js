import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createClient = createAsyncThunk(
   "client/createClient",
   async ({ payload, toast, handleClose }, { rejectWithValue }) => {
      try {
         const { data } = await userAPI.createClient(payload);
         toast.success("Client Added Successfully");
         handleClose();
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

export const listClient = createAsyncThunk("client/listClient", async (_, { rejectWithValue }) => {
   try {
      const { data } = await userAPI.listClient();
      return data;
   } catch (error) {
      return rejectWithValue(error.response.data);
   }
});

const clientSclice = createSlice({
   name: "client",
   initialState: {
      client: {},
      clients: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createClient.pending]: (state, action) => {
         state.loading = true;
      },
      [createClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.client = action.payload;
         state.clients.push(action.payload);
      },
      [createClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [listClient.pending]: (state, action) => {
         state.loading = true;
      },
      [listClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.clients = action.payload;
      },
      [listClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default clientSclice;
