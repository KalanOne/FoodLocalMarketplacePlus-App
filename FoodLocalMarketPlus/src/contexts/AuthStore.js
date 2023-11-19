import { create } from "zustand";

const useAuthStore = create((set) => ({
  userToken: null,
  email: null,
  display: "Login",
  started: false,
  setUserToken: (token) => set({ userToken: token }),
  setEmail: (email) => set({ email: email }),
  setDisplay: (display) => set({ display: display }),
  setStarted: (started) => set({ started: started }),
  reset: () =>
    set({ userToken: null, email: null, display: "Login", started: false }),
}));

export default useAuthStore;
