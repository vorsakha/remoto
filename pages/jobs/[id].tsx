import axios from "axios";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Details from "../../components/Details";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

interface DataType {
  body: string;
  html_url: string;
  created_at: string;
  id: number;
  labels: {
    name: string;
  }[];
  title: string;
}
interface ArrType {
  params: {
    id: string;
  };
}
interface ParamType {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: ParamType) {
  const ghData = await axios.get("https://remoto.vercel.app/api/data");

  const data = ghData.data;

  //Filter data arr
  const filteredData = data.data.filter(
    (item: DataType) => item.id === Number(params.id)
  );

  return {
    props: {
      data: filteredData[0],
    },
    revalidate: 43300,
  };
}

export async function getStaticPaths() {
  const ghData = await axios.get("https://remoto.vercel.app/api/data");

  const data = ghData.data;

  const arr: ArrType[] = [];

  data.data.forEach((item: DataType) => {
    arr.push({ params: { id: String(item.id) } });
  });

  return {
    paths: [...arr],
    fallback: false,
  };
}

const JobDescription = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const typedData: DataType = data;

  return (
    <div>
      <Head>
        <title>Vaga {typedData.title} | REMOTO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-code min-h-total max-w-screen-lg m-auto px-4">
        <Header />

        <Details data={data} />
      </main>

      <Footer />
    </div>
  );
};

export default JobDescription;
