import { create } from "zustand";

interface ContadorState {
  contador: number;
  incrementar: () => void;
  decrementar: () => void;
  resetar: () => void;
}

export const useContadorStore = create<ContadorState>((set) => ({
  contador: 0,
  incrementar: () => set((state) => ({ contador: state.contador + 1 })),
  decrementar: () => set((state) => ({ contador: state.contador - 1 })),
  resetar: () => set({ contador: 0 }),
}));
