import axios from "axios";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Jobs from "../components/Jobs";
import { url } from "../constants";
import { FilterContext } from "../context/FilterContext";
import useFilterByDate from "../hooks/useFilterByDate";
import useFilterByUserSelection from "../hooks/useFilterByUserSelection";

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

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const filterContext = useContext(FilterContext);

  const jobsFilteredByDate = useFilterByDate(data);

  const filterArray = filterContext?.filterArray || [];
  useFilterByUserSelection(filterArray, jobsFilteredByDate);

  return (
    <div>
      <Head>
        <title>REMOTO</title>
        <meta
          name="description"
          content="Dev jobs para trabalhar de onde quiser."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-code min-h-total max-w-screen-lg m-auto px-4 text-gray-800">
        <Header />

        <Jobs />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
