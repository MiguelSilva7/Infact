import { create } from "zustand";

const usePeopleStore = create((set) => ({
  people: [],
  setPeople: (p) => set({ people: p }),
}));

export default usePeopleStore;
