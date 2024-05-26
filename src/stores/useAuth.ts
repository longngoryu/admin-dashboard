import { User } from "@/types";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
};

const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser(user) {
    set({ user: user });
  },
}));

export default useAuth;
