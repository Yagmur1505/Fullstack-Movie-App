const defaultRequest = (request,response) => {
    // Cevabın durum kodunu belirler
    response.statusCode = 404;

    // Cevabın içeriğini belirler

    //cevaba gönderilecek içeriğin tipini header olarak ekler
    // response.setHeader('Content-Type', 'application/json');

    // cevabın içerğini belirler
    const responseBody = JSON.stringify({ message: "İstek adresi tanımsız" });
    response.write(responseBody); // String olarak yaz
    // cevabı clianta gönerir
    response.end();
}

module.exports = defaultRequest


