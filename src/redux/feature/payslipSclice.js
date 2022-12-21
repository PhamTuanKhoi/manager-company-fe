import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payslipAPI } from "../../api/payslip";
import { userAPI } from "../../api/user";

export const createPayslip = createAsyncThunk(
   "paySlip/createPayslip",
   async ({ payload, toast }, { rejectWithValue }) => {
      try {
         const { data } = await payslipAPI.createPayslip(payload);
         toast.success("Thêm dự án thành công");
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

const payslipSclice = createSlice({
   name: "payslip",
   initialState: {
      payslip: {},
      payslips: [],
      error: "",
      loading: false,
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
   },
});

// export
export default payslipSclice;
