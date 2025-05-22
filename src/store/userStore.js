import { create } from "zustand";

export const useUserLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (bool) => set({ isLogin: bool }),
}));

export const useUserInfoStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({userInfo:userInfo}) 
}
))
