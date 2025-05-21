import { create } from "zustand";

export const useUserLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export const useUserInfoStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({userInfo:userInfo}) 
}
))
