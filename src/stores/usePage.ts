import { create } from "zustand";

type PageStore = {
  title: string;
  setTitle: (title: string) => void;
};

export const usePage = create<PageStore>((set) => ({
  title: "",
  setTitle(title) {
    set({ title: title });
  },
}));
