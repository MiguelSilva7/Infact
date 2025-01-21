import React, { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { useSearchParams } from "react-router-dom";
import { filterAdmin } from "../../services/genericService";

const FilterBarAdmin = () => {
  const [keyword, setKeyword] = useState("");
  const {
    currentTable,
    setCurrentTable,
    setFilteredCurrentTable,
    setFocusedObject,
  } = useAdminStore();

  const [searchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = filterAdmin(currentTable, { title: keyword });
    setFilteredCurrentTable(filtered);
    if (filtered.length > 0) {
      setFocusedObject(filtered[0]);
    } else {
      setFocusedObject(null);
    }
  };

  const handleResetFilters = (e) => {
    setKeyword("");
    setFilteredCurrentTable(currentTable);
    setFocusedObject(currentTable[0]);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className=" flex items-center gap-6">
        <div className="">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="small-neobrutalism rounded-md border border-black px-3 py-2 outline-none"
            type="text"
            placeholder="Mot-clef"
          />
        </div>
        <div className=" bg-myyellow small-neobrutalism small-neobrutalism-hover cursor-pointer rounded-md px-3 py-2 text-black">
          <button type="submit">Filtrer</button>
        </div>
        <div className="bg-myyellow small-neobrutalism small-neobrutalism-hover hidden cursor-pointer rounded-md px-3 py-2 text-black md:block">
          <button onClick={() => handleResetFilters()}>
            Réinitialiser les filtres
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBarAdmin;
