const http = require("http");
const fs = require("fs-extra");

// const options = {
//   key: fs.readFileSync("cert/key.pem"),
//   cert: fs.readFileSync("cert/certificate.pem"),
// };
const server = http.createServer((req, res) => {
  try {
    console.log(req.method);
    console.log(req.url);
    res.writeHead(200);
    res.end("<h1>Servidor Online!</h1>");
  } catch (err) {
    console.error(`Erro ao processar solicitação: ${err}`);
    res.writeHead(500);
    res.end("Erro interno do servidor");
  }
});

server
  .listen(3000, () => {
    console.log("Servidor Online!");
  })
  .on("error", (err) => {
    console.error(`Erro ao iniciar o Servidor: ${err}`);
  });
