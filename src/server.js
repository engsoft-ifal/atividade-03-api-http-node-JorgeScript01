//Código do servidor

import http from "http";

const PORT = 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { status: "OK" });
  }

  sendJson(res, 404, { erro: "Rota não encontrada" });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
