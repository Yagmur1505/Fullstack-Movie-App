const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

const keys = [
   "title",
   "year",
   "rating",
   "description",
   "language", 
   "director",
   "duration" ];

const postRequest= async (req, res) => {
    // post isteği atılınca body deki verileri alacağız
     if (req.url === "/api/movies"){
        // isteğin body kısmına eriş
       const body = await bodyParser(req);
       // gelen verileri kontrol et


       if(
         // keys ten herhangi birisi bile yoksa hata döndür
         keys.some(key => !body[key] ) ||
         !body.genre.length > 0 || 
         !body.cast.length > 0  ){
          res.writeHead(404);
          return res.end("lütfen zorunlu olan bütün alanları tamamlayın");
         }
       // kaydedilecek filme id ekle (universal unique id)
       body.id = crypto.randomUUID();
       
       // json dosyasından verileri al
       let data = fs.readFileSync("./data/movies.json","utf-8") ;
        data =JSON.parse(data);

       // mevcut filmlerin üzerine yeni film ekle 
       data.movies.push(body);

       // json dosyasını güncelle 
       fs.writeFileSync("./data/movies.json", JSON.stringify(data));

       // clianta cevap gönder
       res.writeHead(201);
       res.end(JSON.stringify(body));

     }else {
        res.writeHead(404);
        res.end("Geçersiz yola istek atıldı");
     }

    
};
 
module.exports = postRequest;

console.log(crypto.randomUUID());