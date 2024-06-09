import { ResponseDataSignin } from "@/types";
import { create } from "zustand";

type AuthStore = {
  userInfo: ResponseDataSignin | null;
  signin: (userInfo: ResponseDataSignin) => void;
  signout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  userInfo: null,
  signin(userInfo) {
    set({ userInfo: userInfo });
  },
  signout() {
    set({ userInfo: null });
  },
}));
