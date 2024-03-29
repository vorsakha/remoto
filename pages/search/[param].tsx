import { useRouter } from "next/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { InferGetStaticPropsType } from "next";
import BackButton from "../../components/common/Buttons/Back";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SearchedJobs from "../../components/SearchedJobs";
import { url } from "../../config";
import { SearchContext } from "../../context/SearchContext";
import { FilterContext } from "../../context/FilterContext";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  const ghData = await axios.get(url);
  const data: any = ghData.data;

  return {
    props: {
      data: data.data,
    },
    revalidate: 21600,
  };
}

const Search = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const param: any = router.query.param;
  const searchContext = useContext(SearchContext);
  const filterContext = useContext(FilterContext);

  useEffect(() => {
    searchContext?.setSearchParam(param);

    filterContext?.setFilterArgs({
      pj: false,
      clt: false,
      junior: false,
      pleno: false,
      senior: false,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <div>
      <Head>
        <title>{`Vagas ${param} | `}REMOTO</title>
        <meta
          name="description"
          content="Dev jobs para trabalhar de onde quiser."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackButton />
      <h1>
        Pesquisa: <strong>{param}</strong>
      </h1>
      {router.isFallback ? (
        <LoadingSpinner />
      ) : (
        <SearchedJobs searchParam={param} data={data} />
      )}
    </div>
  );
};

export default Search;
