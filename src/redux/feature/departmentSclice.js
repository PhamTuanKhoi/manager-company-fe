import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentAPI } from "../../api/department";

export const createDepartment = createAsyncThunk(
   "department/createDepartment",
   async ({ payload, toast, setLoading, empty, handleClose }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await departmentAPI.create(payload);
         toast.success("Thêm khách hàng thành công");
         setLoading(false);
         handleClose();
         empty();
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

export const listDepartment = createAsyncThunk(
   "department/listDepartment",
   async ({ setLoading }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await departmentAPI.list();
         setLoading(false);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateDepartment = createAsyncThunk(
   "department/updateDepartment",
   async ({ id, payload, toast, setLoading, handleClose }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await departmentAPI.update(id, payload);
         toast.success("Cập nhật khách hàng thành công");
         setLoading(false);
         handleClose();
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

export const removeDepartment = createAsyncThunk(
   "department/removeDepartment",
   async ({ id, setLoading, toast, close }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await departmentAPI.delete(id);
         setLoading(false);
         close();
         toast.success(`Xóa khách hàng thành công`);
         return data;
      } catch (error) {
         setLoading(false);
         return rejectWithValue(error.response.data);
      }
   }
);

const departmentSclice = createSlice({
   name: "department",
   initialState: {
      department: {},
      departments: [],
      error: "",
      loading: false,
   },

   extraReducers: {
      [createDepartment.pending]: (state, action) => {
         state.loading = true;
      },
      [createDepartment.fulfilled]: (state, action) => {
         state.loading = false;
         state.departments.push(action.payload);
      },
      [createDepartment.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      //list
      [listDepartment.pending]: (state, action) => {
         state.loading = true;
      },
      [listDepartment.fulfilled]: (state, action) => {
         state.loading = false;
         state.departments = action.payload;
      },
      [listDepartment.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update
      [updateDepartment.pending]: (state, action) => {
         state.loading = true;
      },
      [updateDepartment.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.departments = state.departments.map((item) =>
               item._id === id ? action.payload : item
            );
         }
      },
      [updateDepartment.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // remove
      [removeDepartment.pending]: (state, action) => {
         state.loading = true;
      },
      [removeDepartment.fulfilled]: (state, action) => {
         state.loading = false;
         const {
            arg: { id },
         } = action.meta;

         if (id) {
            state.departments = state.departments.filter((item) => item._id !== id);
         }
      },
      [removeDepartment.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default departmentSclice;
