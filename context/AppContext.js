import { createContext, useContext } from "react";

const AppContext = createContext({
  empty: true,
});

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
