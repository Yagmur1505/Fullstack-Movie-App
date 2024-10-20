const optionsRequest = (request, response) => {
  //* frontend den bir post/put/patch/delete isteği atıldığı zaman tarayıcı öncelikle server`ın bu istek tiplerini kabul ettiğini kontrol etmek amacıyla options http methoduyla istek atıyor. Eğer options isteğine cevap göndermezsek yukarıdaki istek türlerini API`ın kabul etmediğini zannediyor ve asıl isteği hiç bir zaman atmıyor.

  //*OPTIONS isteği gelince doğru headerlara cevap gönderirsek optionsun arkasından asıl isteği atıyor.

  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS"
  );

  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  response.end();
};

module.exports = optionsRequest;
