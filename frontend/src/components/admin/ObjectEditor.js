import React, { useEffect, useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { deleteById } from "../../services/genericService";
import { updateById } from "../../services/genericService";
import { useSearchParams } from "react-router-dom";
import { insert } from "../../services/genericService";

const ObjectEditor = () => {
  const { focusedObject } = useAdminStore();
  const { currentTableName, setCurrentTable, currentTable } = useAdminStore();
  const [editableObject, setEditableObject] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchParams] = useSearchParams();
  const [reduceSize, setReduceSize] = useState(false);
  const tableName = searchParams.get("table");

  const Modes = {
    BASE: "base",
    EDIT: "edit",
    CREATE: "create",
  };

  const [mode, setMode] = useState(Modes.BASE);

  const handleInputChange = (key, value) => {
    setEditableObject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDelete = () => {
    setShowAlert(false);
    try {
      deleteById(tableName, focusedObject.id);
      const updatedTable = currentTable.filter(
        (object) => object.id !== focusedObject.id,
      );
      setCurrentTable(updatedTable);
    } catch (error) {
      console.log(
        "Erreur lors de la suppression dans ",
        currentTableName,
        error,
      );
    }
  };

  const handleConfirmChanges = async () => {
    try {
      updateById(tableName, focusedObject.id, editableObject);
      const updatedTable = currentTable.map((object) => {
        if (object.id === focusedObject.id) {
          return { ...object, ...editableObject };
        }
        return object;
      });
      setCurrentTable(updatedTable);
    } catch (error) {
      console.log(
        "Erreur lors de la mise à jour dans ",
        currentTableName,
        error,
      );
    }
  };

  useEffect(() => {
    setMode(Modes.BASE);
  }, [focusedObject, setMode, Modes.BASE]);

  useEffect(() => {
    if (focusedObject) {
      setEditableObject({ ...focusedObject });
    }
    setMode(Modes.BASE);
  }, [focusedObject, setEditableObject, setMode, Modes.BASE]);

  const handleModify = () => {
    setMode(Modes.EDIT);
    setEditableObject({ ...focusedObject });
  };

  const handleReset = () => {
    setMode(Modes.BASE);
    setEditableObject({ ...focusedObject });
  };

  const handleConfirmInsert = async () => {
    try {
      console.log("editable object : ", editableObject);
      insert(tableName, editableObject);
    } catch (error) {
      console.log("Erreur lors de la mise à jour dans ", tableName, error);
    }
  };

  const handleCreate = () => {
    setMode(Modes.CREATE);
    setEditableObject(
      (obj) =>
        Object.keys(obj).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {}),
      delete editableObject.id,
      delete editableObject.created_at,
    );
  };

  return (
    <div className="[&>div]:bg-myviolet flex h-full flex-col gap-6">
      <div
        className={`neobrutalism neobrutalism:hover relative grow overflow-y-scroll px-6 pb-6 pt-16 md:pt-6 ${reduceSize && "w-[64px] [&>div]:hidden"}`}
      >
        <section
          onClick={() => setReduceSize(!reduceSize)}
          className="bg-myyellow absolute right-3 top-3 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md border-2 border-black text-xl font-bold md:hidden"
        >
          {reduceSize ? "+" : "-"}
        </section>
        <div
          onClick={() => setShowAlert(false)}
          className={
            showAlert
              ? "fixed left-0 top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.5)]"
              : "hidden"
          }
        ></div>
        <div
          className={
            showAlert
              ? "fixed left-1/2 top-1/2 z-20 flex h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-evenly border-2 border-black bg-white p-8"
              : "hidden"
          }
        >
          <div className="text-center text-2xl">
            Etes-vous sûr de vouloir supprimer cet élément de la table ?
          </div>
          <div className="flex gap-6 [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:transition-all [&>div]:duration-300">
            <div
              onClick={() => handleDelete()}
              className="bg-red-800 px-3 py-2 text-white hover:bg-red-600"
            >
              Confirmer
            </div>
            <div
              onClick={() => setShowAlert(false)}
              className="bg-blue-500 px-3 py-2 hover:bg-blue-400"
            >
              Annuler
            </div>
          </div>
        </div>
        {!focusedObject ? (
          <div>Loading</div>
        ) : (
          <div className="space-y-4">
            {Object.keys(editableObject || {}).map((key) => (
              <div
                key={key}
                className="object-key-value flex min-h-[52px] items-center rounded-md border border-black bg-white px-3 py-2 [&>div:first-child]:shrink-0 [&>div:first-child]:basis-[25%] [&>input]:w-full [&>input]:px-2 [&>input]:py-1"
              >
                <div
                  className={
                    key !== "id" && key !== "created_at"
                      ? "font-semibold text-black"
                      : "font-semibold"
                  }
                >
                  {key}:
                </div>
                {mode === Modes.BASE || key === "id" || key === "created_at" ? (
                  <div>{editableObject[key]}</div>
                ) : (
                  <input
                    className="border border-black"
                    type={
                      key === "salary" || key.includes("id") ? "number" : "text"
                    }
                    value={editableObject[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={`neobrutalism [&>div]:small-neobrutalism [&>div]:hover:small-neobrutalism-hover flex justify-between gap-4 p-6 [&>div]:grow [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:px-3 [&>div]:py-2 [&>div]:text-center [&>div]:transition-all [&>div]:duration-300 ${reduceSize && "hidden"}`}
      >
        <div
          onClick={() => setShowAlert(true)}
          className="bg-red-500 text-black hover:bg-red-400"
        >
          Supprimer
        </div>
        <div
          onClick={() => handleModify()}
          className="bg-blue-500 text-justify hover:bg-blue-400"
        >
          Modifier
        </div>
        <div
          onClick={() => handleConfirmChanges()}
          className={
            mode === Modes.EDIT ? "bg-green-500 hover:bg-green-400" : "hidden"
          }
        >
          Confirmer les modifications
        </div>
        <div
          onClick={() => handleCreate()}
          className="bg-blue-500 hover:bg-blue-400"
        >
          Ajouter
        </div>
        <div
          onClick={() => handleConfirmInsert()}
          className={
            mode === Modes.CREATE ? "bg-green-500 hover:bg-green-400" : "hidden"
          }
        >
          Confirmer l'ajout
        </div>
        <div
          onClick={() => handleReset()}
          className={
            mode !== Modes.BASE
              ? "hover:bg-greyellowen-400 bg-yellow-500"
              : "hidden"
          }
        >
          Annuler
        </div>
      </div>
    </div>
  );
};

export default ObjectEditor;
