import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contractCategoryAPI } from "../../api/contractCategory";
import { userAPI } from "../../api/user";

export const createContractCategory = createAsyncThunk(
   "contractCategory/createContractCategory",
   async ({ payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractCategoryAPI.create(payload);
         toast.success("Thêm hợp đồng thành công");
         setLoading(false);
         // empty();
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

export const findAllContractCategory = createAsyncThunk(
   "contractCategory/findAllContractCategory",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractCategoryAPI.findAll();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const findByIdContractCategory = createAsyncThunk(
   "contractCategory/findByIdContractCategory",
   async ({ id, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractCategoryAPI.findById(id);
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateContractCategory = createAsyncThunk(
   "contractCategory/updateContractCategory",
   async ({ id, payload, toast, setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractCategoryAPI.update(id, payload);
         toast.success("Thêm hợp đồng thành công");
         setLoading(false);
         return { data, projectItem: payload?.projectItem };
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

export const deleteContractCategory = createAsyncThunk(
   "contractCategory/deleteContractCategory",
   async ({ id, toast, setLoading, close }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await contractCategoryAPI.delete(id);
         toast.success("xóa hợp đồng thành công");
         close();
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

const contractCategorySclice = createSlice({
   name: "contractCategory",
   initialState: {
      contractCategory: {},
      contractCategorys: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [findAllContractCategory.pending]: (state, action) => {
         state.loading = true;
      },
      [findAllContractCategory.fulfilled]: (state, action) => {
         state.loading = false;
         state.contractCategorys = action.payload;
      },
      [findAllContractCategory.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      [findByIdContractCategory.pending]: (state, action) => {
         state.loading = true;
      },
      [findByIdContractCategory.fulfilled]: (state, action) => {
         state.loading = false;
         state.contractCategory = action.payload;
      },
      [findByIdContractCategory.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // create
      [createContractCategory.pending]: (state, action) => {
         state.loading = true;
      },
      [createContractCategory.fulfilled]: (state, action) => {
         state.loading = false;
         state.contractCategorys.push(action.payload);
      },
      [createContractCategory.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateContractCategory.pending]: (state, action) => {
         state.loading = true;
      },
      [updateContractCategory.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         const { data, projectItem } = action.payload;

         state.contractCategorys = state.contractCategorys.map((i) =>
            i._id === id ? { ...data, project: projectItem } : i
         );
      },
      [updateContractCategory.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // delete
      [deleteContractCategory.pending]: (state, action) => {
         state.loading = true;
      },
      [deleteContractCategory.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         state.contractCategorys = state.contractCategorys.filter((i) => i._id !== id);
      },
      [deleteContractCategory.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default contractCategorySclice;
