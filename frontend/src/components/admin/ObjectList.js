import React, { useEffect } from "react";
import useAdminStore from "../../stores/adminStore";
import { useSearchParams } from "react-router-dom";

const ObjectList = () => {
  const {
    currentTable,
    setFocusedObject,
    filteredCurrentTable,
    setFilteredCurrentTable,
    focusedObject,
  } = useAdminStore();
  console.log("current : ", currentTable);

  useEffect(() => {
    setFilteredCurrentTable(currentTable);
  }, [setFilteredCurrentTable, currentTable]);

  useEffect(() => {
    if (currentTable.length === 0) setFocusedObject(null);
  }, [currentTable]);
  return (
    <div>
      {currentTable.length === 0 ? (
        <p>Loading</p>
      ) : (
        filteredCurrentTable.map((object, index) => (
          <div
            key={index}
            onClick={() => setFocusedObject(object)}
            className={`bg-myviolet neobrutalism neobrutalism-hover mb-4 cursor-pointer rounded-md border border-black p-4 transition-all duration-300 hover:scale-[103%] ${focusedObject.id === object.id ? "bg-myyellow" : ""}`}
          >
            {Object.keys(object).map((key) => (
              <div key={key}>
                <strong>{key}:</strong> {object[key]}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ObjectList;
