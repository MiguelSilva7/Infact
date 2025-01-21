import JobList from "../components/JobList";
import FilterBar from "../components/FilterBar";
import DetailedJob from "../components/DetailedJob";
import Header from "../components/Header";

const Main = () => {
  return (
    <div className="bg-mywhite flex min-h-screen flex-col items-center justify-center gap-3 md:gap-6">
      <div className="w-11/12 md:w-3/4">
        <Header />
      </div>
      <div className="main-template grid h-[82vh] w-11/12 grid-cols-2 grid-rows-[80px_1fr] gap-3 md:w-3/4 md:gap-6">
        <div
          className="neobrutalism bg-mygreen flex items-center p-3 md:p-6"
          style={{ gridArea: "a" }}
        >
          <FilterBar />
        </div>
        <div
          className="neobrutalism bg-mygreen !col-span-2 h-full overflow-y-scroll bg-right p-3 md:!col-auto md:mb-auto md:p-6"
          style={{ gridArea: "b" }}
        >
          <JobList />
          <div
            className="sticky bottom-0 mt-3 md:hidden md:h-auto"
            style={{ gridArea: "c" }}
          >
            <DetailedJob />
          </div>
        </div>
        <div
          className="neobrutalism bg-mygreen hidden h-auto p-3 md:block md:p-6"
          style={{ gridArea: "c" }}
        >
          <DetailedJob />
        </div>
      </div>
    </div>
  );
};

export default Main;
