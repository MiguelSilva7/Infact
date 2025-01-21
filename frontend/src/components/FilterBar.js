import React, { useState } from "react";
import useAdvertisementsStore from "../stores/advertisementsStore";
import { filterTable } from "../services/advertisementsService";

const FilterBar = () => {
  const { advertisements, setFilteredAdvertisements, setFocusedAdvertisement } =
    useAdvertisementsStore();
  const [keyword, setKeyword] = useState("");
  const [minSalary, setMinSalary] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = filterTable(advertisements, {
      title: keyword,
      salary: minSalary,
    });
    setFilteredAdvertisements(filtered);
    if (filtered.length > 0) {
      setFocusedAdvertisement(filtered[0]);
    } else {
      setFocusedAdvertisement(null);
    }
  };

  const handleResetFilters = (e) => {
    setKeyword("");
    setMinSalary("0");
    setFilteredAdvertisements(advertisements);
    setFocusedAdvertisement(advertisements[0]);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-center gap-6">
        <div>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="small-neobrutalism rounded-md border border-black px-3 py-2 outline-none"
            type="text"
            placeholder="Mot-clef"
          />
        </div>
        <div className="hidden md:block">
          <input
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="small-neobrutalism rounded-md border border-black px-3 py-2 outline-none"
            type="number"
            placeholder="Min. salary"
          />
        </div>
        <div className="bg-accent bg-myyellow hover:bg-myviolet small-neobrutalism small-neobrutalism-hover hover:bg-secondary cursor-pointer rounded-md px-3 py-2 text-black transition-all duration-300">
          <button type="submit">Filtrer</button>
        </div>
        <div className="bg-myyellow small-neobrutalism hover:bg-myviolet small-neobrutalism-hover hover:bg-secondary hidden cursor-pointer rounded-md px-3 py-2 text-black transition-all duration-300 md:block">
          <button onClick={() => handleResetFilters()}>
            Réinitialiser les filtres
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
