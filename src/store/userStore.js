import { create } from "zustand";

export const useUserLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set({ isLogin: true }),
}));

export const useUserInfoStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({userInfo:userInfo}) 
}
))
