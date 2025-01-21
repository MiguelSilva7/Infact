import { create } from "zustand";

const useAdvertisementsStore = create((set) => ({
  advertisements: [],
  setAdvertisements: (advs) => set({ advertisements: advs }),

  filteredAdvertisements: [],
  setFilteredAdvertisements: (advs) => set({ filteredAdvertisements: advs }),
  focusedAdvertisement: null,
  setFocusedAdvertisement: (adv) => set({ focusedAdvertisement: adv }),
  filterAdvertisements: ({ title }) =>
    set((state) => ({
      filteredAdvertisements: state.advertisements.filter((adv) =>
        adv.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            title
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
          ),
      ),
    })),
}));

export default useAdvertisementsStore;
