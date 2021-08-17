import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Jobs from "../components/Jobs";
import Pagination from "../components/Pagination";
import { Context } from "./_app";

interface DateType {
  body: string;
  html_url: string;
  created_at: string;
  id: number;
  labels: {
    name: string;
  }[];
  title: string;
}

export async function getStaticProps() {
  try {
    const rbrRes = await fetch(
      "https://api.github.com/repos/react-brasil/vagas/issues?state=open&per_page=50"
    );
    const fbrRes = await fetch(
      "https://api.github.com/repos/frontendbr/vagas/issues?state=open&per_page=50"
    );
    const rbr = await rbrRes.json();
    const fbr = await fbrRes.json();

    return {
      props: {
        data: [...rbr, ...fbr],
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const context = useContext(Context);

  useEffect(() => {
    const staticData: DateType[] = data;

    const filterJobs = staticData.sort((a, b) => {
      const dateA: any = new Date(a.created_at);
      const dateB: any = new Date(b.created_at);

      return dateB - dateA;
    });

    context?.setJobs(filterJobs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(context?.jobs);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-mono min-h-total max-w-screen-lg m-auto">
        <Header />

        <Pagination />

        <Jobs />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
