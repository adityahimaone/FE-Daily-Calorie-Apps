import { createSlice } from "@reduxjs/toolkit";

export const applice = createSlice({
  name: "app",
  initialState: {
    privilege: "guest",
    theme: "light",
  },
  reducers: {
    setPrivilege: (state, action) => {
      state.privilege = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setPrivilege, setTheme } = applice.actions;
export default applice.reducer;
