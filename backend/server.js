// http modülünü import et
const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");
const optionsRequest = require("./methods/options");

// 1) HTTP server oluştur
const server = http.createServer((request, response) => {
  // bütün cevaplara eklenecek ortak veri tipi  header ekle
  response.setHeader("Content-Type", "application/json");
  // kaynak paylaşımında sorun yaşamamak ve corss hatasını yaşamamk için yeni bir header ekliyoruz.
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  console.log("istek geldi", request.method);
  // Gelen isteğin method türüne göre client'a farklı cevaplar göndereceğiz.
  switch (request.method) {
    case "GET":
      return getRequest(request, response);

    case "POST":
      return postRequest(request, response);

    case "DELETE":
      return deleteRequest(request, response);

    case "OPTIONS":
      return optionsRequest(request, response);

    default:
      return deleteRequest(request, response);
  }
});

// 2) Belirli bir porta gelen istekleri dinle
const port = 4090;

server.listen(port, () => {
  console.log(`🎾 Sunucu ${port}'te gelen istekleri dinlemeye başladı`);
});
