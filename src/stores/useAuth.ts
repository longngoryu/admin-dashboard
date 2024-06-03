import { User } from "@/types";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  token: string;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  signin: (user: User, token: string) => void;
  signout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: "",
  setUser(user) {
    set({ user: user });
  },
  setToken(token) {
    set({ token: token });
  },
  signin(user, token) {
    this.setUser(user);
    this.setToken(token);
  },
  signout() {
    this.setUser(null);
    this.setToken("");
  },
}));
