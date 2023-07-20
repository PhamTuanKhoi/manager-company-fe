import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contractDetailAPI } from "../../api/contractDetail";

export const findAllContractDetail = createAsyncThunk(
   "contractDetail/findAllContractDetail",
   async ({ query, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractDetailAPI.findAll(query);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const findContractDetailById = createAsyncThunk(
   "contractDetail/findById",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractDetailAPI.findById(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

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

export const updateContractDetail = createAsyncThunk(
   "contractDetail/updateContractDetail",
   async ({ id, payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractDetailAPI.update(id, payload);
         toast.success("Cập nhật chi tiết hợp đồng thành công");
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
      // list
      [findAllContractDetail.pending]: (state, action) => {
         state.loading = true;
      },
      [findAllContractDetail.fulfilled]: (state, action) => {
         state.loading = false;
         state.contractDetails = action.payload;
      },
      [findAllContractDetail.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
      // find contract detail by id
      [findContractDetailById.pending]: (state, action) => {
         state.loading = true;
      },
      [findContractDetailById.fulfilled]: (state, action) => {
         state.loading = false;
         state.contractDetail = action.payload;
      },
      [findContractDetailById.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
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
      // update
      [updateContractDetail.pending]: (state, action) => {
         state.loading = true;
      },
      [updateContractDetail.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [updateContractDetail.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default contractDetailSclice;
