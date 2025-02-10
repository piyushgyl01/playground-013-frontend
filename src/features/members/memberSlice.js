import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

//API CALLS USING REDUX THUNKS

//GET ALL MEMBERS
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    try {
      const response = await axios.get(
        "https://playground-013-backend.vercel.app/members"
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

//GET MEMBER BY ID
export const fetchMemberById = createAsyncThunk(
  "members/fetchMemberById",
  async (memberId) => {
    try {
      const response = await axios.get(
        `https://playground-013-backend.vercel.app/members/${memberId}`
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

//POST MEMBER
export const postMember = createAsyncThunk(
  "members/postMember",
  async (formData) => {
    try {
      const response = await axios.post(
        "https://playground-013-backend.vercel.app/members",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

//UPDATE EXISTING MEMBER
export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ formData, memberId }) => {
    try {
      const response = await axios.put(
        `https://playground-013-backend.vercel.app/members/${memberId}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Put Error: ", error);
      throw error;
    }
  }
);

//DELETE EXISTING MEMBER
export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (memberId) => {
    try {
      const response = await axios.delete(
        `https://playground-013-backend.vercel.app/members/${memberId}`
      );

      return { memberId };
    } catch (error) {
      console.error("Delete Error: ", error);
      throw error;
    }
  }
);

export const memberSlice = createSlice({
  name: "Members",
  initialState: {
    members: [],
    singleMember: null,
    fetchStatus: "idle",
    error: null,
    fetchByIdStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })
      .addCase(fetchMemberById.pending, (state) => {
        state.fetchByIdStatus = "loading";
      })
      .addCase(fetchMemberById.fulfilled, (state, action) => {
        state.fetchByIdStatus = "success";
        state.singleMember = action.payload;
      })
      .addCase(fetchMemberById.rejected, (state, action) => {
        state.fetchByIdStatus = "error";
        state.error = action.error.message;
      })
      .addCase(postMember.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(postMember.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.members.push(action.payload);
      })
      .addCase(postMember.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      .addCase(deleteMember.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.members = state.members.filter(
          (member) => member._id !== action.payload.memberId
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      })
      .addCase(updateMember.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedMember = action.payload;
        const index = state.members.findIndex(
          (member) => member._id === updatedMember._id
        );
        if (index !== -1) {
          state.members[index] = updatedMember;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const getAllMembers = (state) => state.members.members;
export const getMemberById = (state) => state.members.singleMember;

export const getMemberByStatus = createSelector(
  (state) => state.members.fetchStatus,
  (state) => state.members.addStatus,
  (state) => state.members.deleteStatus,
  (state) => state.members.updateStatus,
  (state) => state.members.fetchByIdStatus,

  (fetchStatus, addStatus, deleteStatus, updateStatus, fetchByIdStatus) => ({
    fetchStatus,
    addStatus,
    deleteStatus,
    updateStatus,
    fetchByIdStatus,
  })
);

export default memberSlice.reducer;
