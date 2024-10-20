const fs = require("fs");

const getRequest = (req, res) => {
  // URL'in temel adresini değişkene aktar (sondaki parametreyi hariç tut)
  const path = req.url.slice(0, 11);

  // URL'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  //urlin sonundaki parametrenin değerini al
  const param = req.url.split("=").pop().toLowerCase().trim();

  // id parametresi varsa id numaralı filmin detaylarını gönder
  if (path === "/api/movies" && id) {
    // Eşitlik kontrolü için `===` kullandık
    //1) JSON DOSYASINDAN FİLMLER AL

    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    //2) URL DEKİ İD YE KARŞILIK GELEN ELEMANI DİZİDE ARA

    const movie = data.find((i) => i.id === id);

    // 3) eğer film varsa clianta gönder
    if (movie) {
      return res.end(JSON.stringify(movie));
    }
    // eğer bulunamazsa hata gönder
    return res.end(JSON.stringify({ message: "Aranılan film bulunamadı" }));
  }
  // temel url e istek atılırsa bütün filmleri gönder
  if (path === "/api/movies") {
    //1) JSON DOSYASINDAN FİLMLERİ AL
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    if (param && param !== "/api/movies") {
      const filtred = movies.filter((movie) =>
        movie.title.toLowerCase().includes(param)
      );
      // eğer parametre varsa filtrelenmiş filmleri gönder
      return res.end(JSON.stringify(filtred));
    }
    return res.end(JSON.stringify(movies));
  }

  // Geçersiz istek durumunda yanıt ver
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  // yol yanlışsa hata gönder
  return res.end(JSON.stringify({ message: "Yol bulunamadı" }));
};

module.exports = getRequest;
