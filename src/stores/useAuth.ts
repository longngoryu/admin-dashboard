import { ResponseDataMe } from "@/types";
import { create } from "zustand";

type AuthStore = {
  userInfo: ResponseDataMe | null;
  signin: (userInfo: ResponseDataMe) => void;
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
