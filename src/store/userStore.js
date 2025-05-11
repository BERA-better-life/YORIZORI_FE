import { create } from "zustand";

export const useUserLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set({ isLogin: true }),
}));
