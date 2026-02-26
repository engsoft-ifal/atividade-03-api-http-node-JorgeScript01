//Código do servidor

import http from "http";

const PORT = 3000;

const atendimentos = [];
let currentId = 1;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { status: "OK" });
  }

  if (method === "GET" && url === "/atendimentos") {
    return sendJson(res, 200, atendimentos);
  }

  if (method === "GET" && url.startsWith("/atendimentos/")) {
    const id = Number(url.split("/")[2]);

    const atendimento = atendimentos.find((item) => item.id === id);

    if (!atendimento) {
      return sendJson(res, 404, { erro: "Registro não encontrado" });
    }

    return sendJson(res, 200, atendimento);
  }

  sendJson(res, 404, { erro: "Rota não encontrada" });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
