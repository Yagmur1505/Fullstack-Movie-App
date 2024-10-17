import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Main = () => {
  // useQuery hook'u ile API'den veri çekiyoruz
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies"], // queryKey burada doğru olarak Array şeklinde olmalı
    queryFn: () => api.get("/api/movies123").then((response) => response.data), // API isteği
  });

  return (
    <div className="px-5 md:px-10 mt-10">
      <h2>Hero</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div>
          {data.map((movie) => (
            <div>Kart</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
