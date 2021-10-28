import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext } from "react";
import { JobsContext } from "../../context/JobsContext";
import useLimitJobsPerPage from "../../hooks/useLimitJobsPerPage";
import Alert from "../common/Alert";
import Fav from "../common/Fav";
import LoadingSpinner from "../common/LoadingSpinner";
import Filter from "../Filter";
import JobsAvailable from "../JobsAvailable";
import {
  dateFormatter,
  tagFormatter,
  titleFormatter,
} from "../../utils/formatters";
import getIcon from "../../utils/icons";
import Pagination from "../Pagination";
import useSearchByParam from "../../hooks/useSearchByParam";
import useFilterByDate from "../../hooks/useFilterByDate";

const SearchedJobs = ({
  searchParam,
  data,
}: {
  searchParam: string;
  data: DataTypes[];
}) => {
  const context = useContext(JobsContext);
  const jobsFilteredByDate = useFilterByDate(data);
  useSearchByParam(searchParam, jobsFilteredByDate);

  const router = useRouter();
  const { id } = router.query;
  const page = !Number(id) ? 1 : Number(id);
  const jobsLength =
    (context?.jobs !== undefined && context!.jobs?.length) || 1;
  const jobs = context?.jobs || [];

  const limitedJobsPerPage = useLimitJobsPerPage(page, jobs);

  const today = new Date().toString();

  const totalAvailable = context?.jobs?.length;

  return (
    <div className="font-nunito pt-4 pb-8">
      <Alert />
      <div className="w-full flex flex-row justify-between">
        <JobsAvailable totalAvailable={totalAvailable} />
        <Filter />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {limitedJobsPerPage !== null && limitedJobsPerPage !== undefined ? (
          limitedJobsPerPage.length === 0 ? (
            <p>Vaga não encontrada.</p>
          ) : (
            limitedJobsPerPage.map((item) => (
              <div key={item.id} className="relative">
                <Fav id={item.id} />

                <Link
                  href={{
                    pathname: `/jobs/[id]`,
                    query: { id: item.id },
                  }}
                >
                  <a className="text-gray-700 flex flex-col justify-center h-full p-4 no-underline shadow-md rounded border-purple-700 border border-opacity-25 hover:shadow-lg hover:border-opacity-50">
                    <small className="text-red-600 opacity-80 font-bold font-code absolute top-0 left-0 p-2 pt-1">
                      {dateFormatter(item.created_at) ===
                        dateFormatter(today) && "Nova!"}
                    </small>
                    <h2 className="font-code pt-0">
                      {titleFormatter(item.title)}
                    </h2>
                    <div className="flex flex-row flex-wrap">
                      {item.labels.map((item, key) => (
                        <div
                          className="font-bold text-sm flex items-center justify-center py-0.5 px-1.5 mx-1 my-1 rounded-lg border border-purple-700 text-purple-700"
                          key={key}
                        >
                          {getIcon(tagFormatter(item.name) || "")}{" "}
                          {tagFormatter(item.name)}
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm p-0 font-mono">
                      {dateFormatter(item.created_at)}
                    </p>
                  </a>
                </Link>
              </div>
            ))
          )
        ) : (
          <LoadingSpinner />
        )}
      </div>

      <Pagination search pagesLength={jobsLength} page={page} />
    </div>
  );
};

export default SearchedJobs;