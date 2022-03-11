import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    id: 0,
    role: "",
    exp: 0,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.exp = action.payload.exp;
    },
    clearAdmin: (state) => {
      state.id = 0;
      state.role = "";
      state.exp = 0;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
