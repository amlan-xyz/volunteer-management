import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001";

export const createEventAsync = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    const response = await axios.post(`${url}/events`, eventData);
    const { data } = response.data;
    return data;
  }
);

export const editEventAsync = createAsyncThunk(
  "events/editEvent",
  async ({ eventId, updatedEventData }) => {
    const response = await axios.put(
      `${url}/events/${eventId}`,
      updatedEventData
    );
    const { data } = response.data;
    return data;
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    const response = await axios.delete(`${url}/events/${eventId}`);
    const { data } = response.data;
    return data;
  }
);

export const getEventsAsync = createAsyncThunk("events/getEvents", async () => {
  const response = await axios.get(`${url}/events`);
  const { data } = response.data;
  return data;
});

export const addExistingVolunteerAsync = createAsyncThunk(
  "events/addVolunteer",
  async ({ eventId, volunteerId, role }) => {
    const response = await axios.post(
      `${url}/events/${eventId}/volunteers/${volunteerId}`,
      role
    );
    const { data } = response.data;
    return data;
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: {
    [createEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    },
    [createEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [editEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [editEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        ({ _id }) => _id !== action.payload._id
      );
    },
    [deleteEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [getEventsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getEventsAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [getEventsAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addExistingVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addExistingVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [addExistingVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default eventsSlice.reducer;
