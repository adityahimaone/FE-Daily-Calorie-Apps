import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    role: "guest",
    exp: 0,
    name: "User",
    email: "",
    avatar_url: "",
    gender: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.exp = action.payload.exp;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.gender = action.payload.gender;
      state.calories = action.payload.calories;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
