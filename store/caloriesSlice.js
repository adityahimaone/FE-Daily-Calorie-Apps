import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  id: 1,
  calories: 0,
};

export const countCalories = createSlice({
  name: "calories",
  initialState: {
    countCalories: initialValue,
  },
  reducers: {
    setCaloriesCount: (state, action) => {
      const { weight, height, age, jk, activity } = action.payload;
      let calorie =
        jk === "male"
          ? (10 * weight + 6.25 * height - 5 * age + 5) * activity
          : (10 * weight + 6.25 * height - 5 * age - 161) * activity;
      const resultCalorie = calorie.toFixed(0);
      const newCalories = { id: 1, calories: resultCalorie };
      state.countCalories = newCalories;
    },
  },
});

export const { setCaloriesCount } = countCalories.actions;
export default countCalories.reducer;
