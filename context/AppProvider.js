import React, { useState, useEffect, useMemo, useReducer } from "react";
import AppContext from "./AppContext";

export default function AppProvider({ children }) {
  const initialState = {
    location: "index",
    theme: "light",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setLocation":
        return { ...state, location: action.payload };
      case "setTheme":
        return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const appReducerValue = useMemo(() => [state, dispatch], [state]);

  return (
    <AppContext.Provider value={appReducerValue}>
      {children}
    </AppContext.Provider>
  );
}
