import { create } from "zustand";

const useUsersStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users: users }),
}));

export default useUsersStore;
