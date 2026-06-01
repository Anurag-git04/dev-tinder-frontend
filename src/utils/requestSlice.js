import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state,action) => {
      const newState = state.filter((request) => request._id !== action.payload)
      return newState;
    },
  },
});

export const { addRequests, removeRequests } = RequestSlice.actions;
export default RequestSlice.reducer;
