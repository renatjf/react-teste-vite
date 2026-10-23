import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export interface UserContextValue {
  user: { nome: string };
  setName: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
export const UserContext = createContext<UserContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeContext.Provider");
  }
  return context;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserContext.Provider");
  }
  return context;
}
