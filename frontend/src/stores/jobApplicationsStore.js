import { create } from "zustand";

const useJobApplicationsStore = create((set) => ({
  jobApplications: [],
  setJobApplications: (jobAp) => set({ jobApplications: jobAp }),
}));

export default useJobApplicationsStore;
