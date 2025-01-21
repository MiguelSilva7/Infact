import React from "react";
import { useNavigate } from "react-router-dom";
import useAdvertisementsStore from "../../stores/advertisementsStore";
import useCompaniesStore from "../../stores/companiesStore";
import useJobApplicationsStore from "../../stores/jobApplicationsStore";
import usePeopleStore from "../../stores/peopleStore";
import useAdminStore from "../../stores/adminStore";
import useUsersStore from "../../stores/usersStore";
import Header from "../Header";

const AdminBoard = () => {
  const navigate = useNavigate();
  const { companies } = useCompaniesStore();
  const { advertisements } = useAdvertisementsStore();
  const { jobApplications } = useJobApplicationsStore();
  const { people } = usePeopleStore();
  const { users } = useUsersStore();
  const { setCurrentTable, setCurrentTableName } = useAdminStore();

  const handleClick = (tableData, tableName) => {
    setCurrentTable(tableData);
    navigate(`/admin-datas-manager?table=${tableName}`);
  };

  return (
    <div className="bg-mywhite flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <div className="w-full md:w-8/12">
        <Header />
      </div>
      <div className="relative grid w-full gap-6 md:w-8/12 md:grid-cols-2 [&>div]:flex [&>div]:h-[160px] [&>div]:cursor-pointer [&>div]:items-center [&>div]:justify-center [&>div]:rounded-xl [&>div]:text-center [&>div]:text-xl [&>div]:font-semibold [&>div]:transition-all hover:[&>div]:scale-[102%] md:[&>div]:h-[260px] md:[&>div]:text-3xl">
        {/* advertisements */}
        <div
          onClick={() => handleClick(advertisements, "advertisement")}
          className="neobrutalism neobrutalism-hover bg-red-500 hover:bg-red-500"
        >
          Manage Advertisements
        </div>
        {/* companies */}
        <div
          onClick={() => handleClick(companies, "company")}
          className="neobrutalism neobrutalism-hover bg-blue-500 hover:bg-blue-400"
        >
          Manage Companies
        </div>
        {/* job_applications */}
        <div
          onClick={() => handleClick(jobApplications, "job_application")}
          className="neobrutalism neobrutalism-hover bg-green-500 hover:bg-green-400"
        >
          Manage Job Applications
        </div>
        {/* people */}
        <div
          onClick={() => handleClick(people, "person")}
          className="neobrutalism neobrutalism-hover bg-purple-500 hover:bg-purple-400"
        >
          Manage People{" "}
        </div>
        {/* users */}
        <div
          onClick={() => handleClick(users, "user")}
          className="neobrutalism neobrutalism-hover bg-yellow-500 hover:bg-yellow-400"
        >
          Manage Users{" "}
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;
