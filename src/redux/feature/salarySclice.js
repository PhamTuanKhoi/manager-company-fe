import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salaryAPI } from "../../api/salary";

export const createSalary = createAsyncThunk(
   "salary/createSalary",
   async ({ payload, toast, onHide, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await salaryAPI.create(payload);
         toast.success("Cài đặt nhóm thụ hưởng thành công");
         setLoading(false);
         onHide();
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

const salarySclice = createSlice({
   name: "salary",
   initialState: {
      salary: {},
      salarys: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      // created salary
      [createSalary.pending]: (state, action) => {
         state.loading = true;
      },
      [createSalary.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createSalary.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default salarySclice;
