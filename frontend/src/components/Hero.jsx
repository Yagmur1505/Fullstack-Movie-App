import { useSearchParams } from "react-router-dom";

const Hero = () => {
  const [params, setParams] = useSearchParams();

  // form gönderilince
  const handleSubmit = (e) => {
    //sayfayı yenilemeyi engelle
    e.preventDefault();

    //aratılan kelimeye eriş
    const text = e.target[0].value;

    //url e parametre olarak formdan alınan texti ekle
    setParams({ query: text });
  };
  return (
    <div className="px-20 py-20 lg:px-20 bg-[linear-gradient(#00000071,#00000071),url('wick.jpg')]  bg-center bg-cover text-white">
      <h1 className="text-4xl md:text5xl">Hoşgeldin</h1>
      <h2 className="text-xl md:text-2xl font-semibold">
        Binlerce Film, Dizi ve Aktörü Keşfet
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative rounded-lg overflow-hidden flex mt-5"
      >
        <input
          //urlde aranan değerin inputta da görünmesi için
          defaultValue={params.get("query")}
          className="w-full py-2 px-4 text-black"
          type="text"
          placeholder="Film, Dizi, Aktör arayın..."
        />
        <button className="bg-blue-500 px-5 font-semibold    hover:bg-blue-600">
          Ara
        </button>
      </form>
    </div>
  );
};

export default Hero;
