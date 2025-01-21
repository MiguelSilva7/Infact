import React, { useEffect, useCallback } from "react";
import FilterBarAdmin from "../components/admin/FilterBarAdmin";
import ObjectEditor from "../components/admin/ObjectEditor";
import ObjectList from "../components/admin/ObjectList";
import useAdminStore from "../stores/adminStore";
import { useSearchParams } from "react-router-dom";
import { getAll } from "../services/genericService";
import Header from "../components/Header";

const AdminDatasManager = () => {
  const { currentTable, setCurrentTable, setFocusedObject } = useAdminStore();
  const [searchParams] = useSearchParams();

  const fetchDatas = useCallback(
    async (table) => {
      try {
        const datas = await getAll(table);
        setCurrentTable(datas);
      } catch (error) {
        console.log("Erreur lors du chargement des données", error);
      }
    },
    [setCurrentTable],
  );

  useEffect(() => {
    const tableName = searchParams.get("table");
    fetchDatas(tableName);
  }, [fetchDatas, searchParams]);

  useEffect(() => {
    if (currentTable.length > 0) {
      setFocusedObject(currentTable[0]);
    }
  }, [setFocusedObject, currentTable]);

  return (
    <div className="bg-mywhite flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="w-11/12 md:w-3/4">
        <Header />
      </div>
      <div className="main-template grid h-[82vh] w-11/12 grid-cols-2 grid-rows-[80px_1fr] gap-3 md:w-3/4 md:gap-6">
        <div
          className="neobrutalism neobrutalism:hover bg-mygreen flex h-[80px] items-center p-6"
          style={{ gridArea: "a" }}
        >
          <FilterBarAdmin />
        </div>
        <div
          className="neobrutalism bg-mygreen !col-span-2 h-full overflow-y-scroll bg-right p-3 md:!col-auto md:mb-auto md:p-6"
          style={{ gridArea: "b" }}
        >
          <ObjectList />
          <div
            className="sticky bottom-0 mt-3 md:hidden md:h-auto"
            style={{ gridArea: "c" }}
          >
            <ObjectEditor />
          </div>
        </div>
        <div
          className="neobrutalism bg-mygreen hidden h-auto p-3 md:block md:p-6"
          style={{ gridArea: "c" }}
        >
          <ObjectEditor />
        </div>
      </div>
    </div>
  );
};

export default AdminDatasManager;
