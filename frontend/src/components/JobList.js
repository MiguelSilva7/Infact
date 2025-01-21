import React, { useEffect, useCallback } from "react";
import useAdvertisementsStore from "../stores/advertisementsStore";
import useCompaniesStore from "../stores/companiesStore";
import { getAll } from "../services/genericService";
import { useAuthStore } from "../stores/authStore";
import LocationOn from "@mui/icons-material/LocationOn";
import EuroIcon from "@mui/icons-material/Euro";
import BusinessIcon from "@mui/icons-material/Business";

const JobList = () => {
  const { token } = useAuthStore();
  const {
    setFocusedAdvertisement,
    focusedAdvertisement,
    filteredAdvertisements,
    setAdvertisements,
    setFilteredAdvertisements,
  } = useAdvertisementsStore();
  const { companies, setCompanies } = useCompaniesStore();

  const getAdvertisements = useCallback(async () => {
    try {
      const datas = await getAll("advertisement", token);
      setAdvertisements(datas);
      setFilteredAdvertisements(datas);
      if (datas) setFocusedAdvertisement(datas[0]);
    } catch (error) {
      console.log("Erreur lors du chargement des données", error);
    }
  }, [
    setAdvertisements,
    setFocusedAdvertisement,
    setFilteredAdvertisements,
    token,
  ]);

  const getCompanies = useCallback(async () => {
    try {
      const companiesData = await getAll("company", token);
      setCompanies(companiesData);
    } catch (error) {
      console.log("Erreur lors du chargement des données", error);
    }
  }, [setCompanies, token]);

  useEffect(() => {
    getAdvertisements();
    getCompanies();
  }, [getAdvertisements, getCompanies]);

  return (
    <div className="space-y-3 md:space-y-6">
      {filteredAdvertisements.error ? (
        <p>Un problème est survenu durant la recherche</p>
      ) : (
        filteredAdvertisements.map((advertisement) => (
          <div
            onClick={() => setFocusedAdvertisement(advertisement)}
            className={`small-neobrutalism small-neobrutalism-hover bg-myviolet cursor-pointer space-y-2 p-4 hover:scale-[102%] ${focusedAdvertisement.id === advertisement.id ? "bg-myyellow" : ""}`}
            key={advertisement.id}
          >
            <h1 className="font-bold">{advertisement.title}</h1>
            <div className="flex items-center gap-2">
              <LocationOn />
              <div>{advertisement.location}</div>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <EuroIcon />
              <div>{advertisement.salary}</div>
            </div>
            <div className="flex items-center gap-2">
              <BusinessIcon />
              <div>
                {companies[advertisement.company_id - 1]?.name || "Loading"}
              </div>
            </div>
            <p>- {advertisement.short_description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
