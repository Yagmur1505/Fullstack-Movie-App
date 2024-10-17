// isteğin body kısmındaki veriye erişebilmek için parça parça gelen bütün byte'ları birleştirip fonksiyonun çağrıldığı yere return et

const bodyParser = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            // Body'nin her parçası geldiğinde onu al ve yukarıdaki stringe ekle
            req.on("data", (chunk) => {
                body += chunk;
            });

            // Yükleme bittiğinde
            req.on("end", () => {
                console.log(body); // Doğru kullanım için parantez düzeltildi
                resolve(JSON.parse(body)); // Birleştirilen body'yi döndür
            });

        } catch (err) {
            // Hata oluşursa hatayı döndür
            reject(err);
        }
    });
};

module.exports = bodyParser;


