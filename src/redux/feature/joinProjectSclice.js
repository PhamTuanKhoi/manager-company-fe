import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { joinProjectAPI } from "../../api/join-project";
import projectSclice from "./projectSclice";
import workerSclice from "./workerSclice";

export const createJoinProject = createAsyncThunk(
   "joinProject/createJoinProject",
   async ({ payload, toast, dispatch, setLoading, worker, setLoad }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await joinProjectAPI.create(payload);
         // remove worker
         dispatch(workerSclice.actions.removeUser(worker._id));
         // add user join project
         dispatch(projectSclice.actions.addUserJoinProject(worker));

         // success
         toast.success("Thêm người lao động thành công");
         setLoading(false);
         setLoad((prev) => prev + 1);
         return { ...data, user: worker };
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

export const premiumsInsurance = createAsyncThunk(
   "joinProject/premiumsInsurance",
   async ({ id, payload, toast, setLoading, dispatch }, { rejectWithValue }) => {
      try {
         setLoading(true);
         const { data } = await joinProjectAPI.updatePremiumsInsurance(id, payload);
         toast.success(`Cập nhật cột đóng bảo hiểm thành công!!`);
         dispatch(data);
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

const joinProjectSclice = createSlice({
   name: "joinProject",
   initialState: {
      joinProject: {},
      joinProjects: [],
      error: "",
      loading: false,
   },
   extraReducers: {
      [createJoinProject.pending]: (state, action) => {
         state.loading = true;
      },
      [createJoinProject.fulfilled]: (state, action) => {
         state.loading = false;
         state.joinProjects.push(action.payload);
      },
      [createJoinProject.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },

      // update premiums insurance
      [premiumsInsurance.pending]: (state, action) => {
         state.loading = true;
      },
      [premiumsInsurance.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [premiumsInsurance.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});

// export
export default joinProjectSclice;
