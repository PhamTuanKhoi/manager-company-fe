import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payslipAPI } from "../../api/payslip";
import { userAPI } from "../../api/user";

export const createPayslip = createAsyncThunk(
   "paySlip/createPayslip",
   async ({ payload, toast, history }, { rejectWithValue }) => {
      try {
         const { data } = await payslipAPI.createPayslip(payload);
         toast.success("Thêm dự án thành công");
         history.push("/app/projects/phieu-luong");
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

export const listPayslip = createAsyncThunk(
   "paySlip/listPayslip",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listPayslipByUser = createAsyncThunk(
   "paySlip/listPayslipByUser",
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await payslipAPI.ListByUser(id);
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const listPayslipByEmployees = createAsyncThunk(
   "paySlip/listPayslipByEmployees",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.listByEmployees(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const listPayslipByClient = createAsyncThunk(
   "paySlip/listPayslipByClient",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await payslipAPI.listByClient(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const payslipSclice = createSlice({
   name: "payslip",
   initialState: {
      payslip: {},
      payslips: [],
      error: "",
      loading: false,
   },
   reducers: {
      payslipDetail: (state, action) => {
         state.payslip = state.payslips.find((i) => i._id === action.payload);
      },
   },
   extraReducers: {
      [createPayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [createPayslip.fulfilled]: (state, action) => {
         console.log(action.payload);
         state.loading = false;
         state.payslip = action.payload;
         state.payslips.push(action.payload);
      },
      [createPayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list
      [listPayslip.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslip.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslip.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by user
      [listPayslipByUser.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslipByUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslipByUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by employees
      [listPayslipByEmployees.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslipByEmployees.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslipByEmployees.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // list by employees
      [listPayslipByClient.pending]: (state, action) => {
         state.loading = true;
      },
      [listPayslipByClient.fulfilled]: (state, action) => {
         state.loading = false;
         state.payslips = action.payload;
      },
      [listPayslipByClient.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default payslipSclice;
