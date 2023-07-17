import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contractDetailAPI } from "../../api/contractDetail";

export const createContractDetail = createAsyncThunk(
   "contractDetail/createContractDetail",
   async ({ payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractDetailAPI.create(payload);
         toast.success("Thêm chi tiết hợp đồng thành công");
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

const contractDetailSclice = createSlice({
   name: "contractDetail",
   initialState: {
      contractDetail: {},
      contractDetails: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      // create
      [createContractDetail.pending]: (state, action) => {
         state.loading = true;
      },
      [createContractDetail.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [createContractDetail.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default contractDetailSclice;
