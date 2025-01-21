import React, { useEffect, useState } from "react";
import useAdvertisementsStore from "../stores/advertisementsStore";
import useCompaniesStore from "../stores/companiesStore";
import ApplyForm from "./ApplyForm";

const DetailedJob = () => {
  const { focusedAdvertisement } = useAdvertisementsStore();
  const { companies } = useCompaniesStore();
  const [showForm, setShowForm] = useState(false);
  const [reduceSize, setReduceSize] = useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [focusedAdvertisement]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div
      className={`flex ${reduceSize ? "h-fit" : "h-[60vh]"} flex-col rounded-md md:h-full`}
    >
      {focusedAdvertisement == null || companies == null ? (
        <p>Aucune offre ne correspond à votre recherche</p>
      ) : (
        <div className="relative flex h-full grow flex-col gap-3">
          <div
            className={`bg-myred md:bg-myviolet neobrutalism ${reduceSize ? "h-fit w-fit [&>div]:hidden" : ""} grow space-y-6 p-4 ${!showForm ? "overflow-y-scroll" : "overflow-hidden"}`}
          >
            <section
              onClick={() => {
                setReduceSize(!reduceSize);
              }}
              className="bg-myyellow sticky right-0 top-0 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md border-2 border-black text-xl font-bold md:hidden"
            >
              {reduceSize ? "+" : "-"}
            </section>
            <div className={`${showForm ? "" : "hidden"}`}>
              <ApplyForm closeForm={() => handleCloseForm()} />
            </div>
            <div>
              <h1 className="text-center text-3xl font-extrabold">
                {focusedAdvertisement.title}
              </h1>
            </div>
            <div>
              <label className="text-2xl font-extrabold">
                Nom de l'entreprise
              </label>
              <p>
                {companies[focusedAdvertisement.company_id - 1]?.name ||
                  "Loading"}
              </p>
            </div>
            <div>
              <label className="text-2xl font-extrabold">Salaire par an</label>
              <p className="font-bold">{focusedAdvertisement.salary}€</p>
            </div>
            <div>
              <label className="text-2xl font-bold">Lieu</label>
              <p>{focusedAdvertisement.location}</p>
            </div>
            <div>
              <label className="text-2xl font-bold">Description du poste</label>
              <p>{focusedAdvertisement.long_description}</p>
            </div>
            <div>
              <label className="text-2xl font-bold">Profil</label>
              <p>{focusedAdvertisement.sought_profil}</p>
            </div>
          </div>
          <div
            onClick={() => setShowForm(true)}
            className={`neobrutalism neobrutalism-hover bg-myyellow hover:bg-myviolet flex h-[55px] shrink-0 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-2xl font-semibold text-black transition-all duration-300 md:h-[80px] ${reduceSize || showForm ? "hidden" : ""}`}
          >
            Postuler
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedJob;
