import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001";
export const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteer",
  async (volunteerData) => {
    const response = await axios.post(`${url}/volunteers`, volunteerData);
    const { data } = response.data;
    return data;
  }
);

export const getVolunteersAsync = createAsyncThunk(
  "volunteers/getVolunteers",
  async () => {
    const response = await axios.get(`${url}/volunteers`);
    const { data } = response.data;
    return data;
  }
);

export const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteer",
  async ({ volunteerId, updatedVolunteerData }) => {
    const response = await axios.put(
      `${url}/volunteers/${volunteerId}`,
      updatedVolunteerData
    );
    const { data } = response.data;
    return data;
  }
);

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (volunteerId) => {
    const response = await axios.delete(`${url}/volunteers/${volunteerId}`);
    const { data } = response.data;
    return data;
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  extraReducers: {
    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    },
    [addVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [getVolunteersAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getVolunteersAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [getVolunteersAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [updateVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex(
        (volunteer) => volunteer._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [updateVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        ({ _id }) => _id !== action.payload._id
      );
    },
    [deleteVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default volunteersSlice.reducer;
