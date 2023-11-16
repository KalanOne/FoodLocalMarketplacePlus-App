import { create } from "zustand";

const useAuthStore = create((set) => ({
  userToken: null,
  setUserToken: (token) => set({ userToken: token }),
}));

export default useAuthStore;
