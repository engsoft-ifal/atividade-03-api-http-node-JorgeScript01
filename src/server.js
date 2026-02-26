//Código do servidor

import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.end("Servidor iniciado");
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
