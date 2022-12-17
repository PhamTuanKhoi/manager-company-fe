import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createEmployees = createAsyncThunk(
   "employees/createEmployees",
   async ({ payload, toast, onHide }, { rejectWithValue }) => {
      try {
         const { data } = await userAPI.createEmployees(payload);
         toast.success("Thêm nhân viên thành công");
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

// export const listClient = createAsyncThunk("client/listClient", async (_, { rejectWithValue }) => {
//    try {
//       const { data } = await userAPI.listClient();
//       return data;
//    } catch (error) {
//       return rejectWithValue(error.response.data);
//    }
// });

const employeesSclice = createSlice({
   name: "employees",
   initialState: {
      employee: {},
      employees: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [createEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         console.log(action.payload, "action");
         state.employee = action.payload;
         state.employees.push(action.payload);
         console.log(state);
      },
      [createEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      // [listClient.pending]: (state, action) => {
      //    state.loading = true;
      // },
      // [listClient.fulfilled]: (state, action) => {
      //    state.loading = false;
      //    state.clients = action.payload;
      // },
      // [listClient.rejected]: (state, action) => {
      //    state.loading = false;
      //    state.error = action.payload.message;
      // },
   },
});

// export
export default employeesSclice;
