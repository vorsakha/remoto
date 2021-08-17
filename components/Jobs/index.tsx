import { useContext, useEffect, useState } from "react";
import { Context } from "../../pages/_app";

interface StateTypes {
  body: string;
  html_url: string;
  created_at: string;
  id: number;
  labels: {
    name: string;
  }[];
  title: string;
}

const Jobs = () => {
  const [arr, setArr] = useState<StateTypes[] | []>([]);

  const context = useContext(Context);

  useEffect(() => {
    const limited = context?.jobs.slice(0, context?.n);

    setArr(limited || []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-nunito">
      <ul>
        {arr?.map((item) => (
          <li key={item.id}>
            {item.title}
            <br /> {item.labels.map((item) => item.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;