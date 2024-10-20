import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const [params, setParams] = useSearchParams();

  // arama yapılmışsa parametreleri al-api isteğinde kullanılacak nesne
  const options = {
    params: {
      query: params.get("query"),
    },
  };

  // useQuery hook'u ile API'den veri çekiyoruz
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies", options], // queryKey burada doğru olarak Array şeklinde olmalı
    queryFn: () =>
      api.get("/api/movies", options).then((response) => response.data), // API isteği
  });

  return (
    <div className="">
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-4 px-5 md:px-10 mt-10 ">
          {data.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
