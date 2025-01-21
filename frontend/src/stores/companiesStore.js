import { create } from "zustand";

const useCompaniesStore = create((set) => ({
  companies: [],
  setCompanies: (comps) => set({ companies: comps }),
}));

export default useCompaniesStore;
