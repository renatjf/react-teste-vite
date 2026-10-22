import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export function useUser() {
  return useContext(UserContext);
}
