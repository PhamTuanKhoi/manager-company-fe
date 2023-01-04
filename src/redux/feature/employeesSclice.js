import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/user";

export const createEmployees = createAsyncThunk(
   "employees/createEmployees",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.createEmployees(payload);
         toast.success("Thêm nhân viên thành công");
         onHide();
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

export const listEmployees = createAsyncThunk(
   "employees/listEmployees",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.listEmployees();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateEmployees = createAsyncThunk(
   "employees/updateEmployees",
   async ({ id, payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await userAPI.updateEmployees(id, payload);
         toast.success("Cập nhật nhân viên thành công");
         onHide();
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

      // list
      [listEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [listEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.employees = action.payload;
      },
      [listEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [updateEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [updateEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;
         state.employees = state.employees.map((item) => (item._id === id ? action.payload : item));
         // state.employees[index] = action.payload;
      },
      [updateEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default employeesSclice;
