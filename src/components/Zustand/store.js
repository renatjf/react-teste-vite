import { create } from "zustand";

export const useContadorStore = create((set) => ({
  contador: 0,
  incrementar: () => set((state) => ({ contador: state.contador + 1 })),
  decrementar: () => set((state) => ({ contador: state.contador - 1 })),
  resetar: () => set({ contador: 0 }),
}));
