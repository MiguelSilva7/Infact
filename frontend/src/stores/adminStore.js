import { create } from "zustand";

const useAdminStore = create((set) => ({
  currentTableName: "",
  setCurrentTableName: (name) => set({ currentTableName: name }),
  currentTable: [],
  setCurrentTable: (table) => set({ currentTable: table }),
  filteredCurrentTable: [],
  setFilteredCurrentTable: (ftable) => set({ filteredCurrentTable: ftable }),
  focusedObject: null,
  setFocusedObject: (obj) => set({ focusedObject: obj }),
}));

export default useAdminStore;
