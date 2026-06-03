import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    removeRequests: (state, action) => {
      const newState = state.filter(
        (request) => request._id !== action.payload,
      );
      return newState;
    },
  },
});

export const { addRequests, removeRequests } = RequestSlice.actions;
export default RequestSlice.reducer;
