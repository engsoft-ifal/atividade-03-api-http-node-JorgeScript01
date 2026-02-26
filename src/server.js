//Código do servidor

import http from "http";
import getRawBody from "raw-body";

const PORT = 3000;

const atendimentos = [];
let currentId = 1;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function validateBody(body) {
  const { aluno, assunto } = body;

  if (!aluno || !assunto) {
    return false;
  }

  return true;
}

const server = http.createServer(async (req, res) => {
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

  if (method === "POST" && url === "/atendimentos") {
    try {
      const rawBody = await getRawBody(req);
      const body = JSON.parse(rawBody.toString());

      if (!validateBody(body)) {
        return sendJson(res, 422, {
          erro: "Campos obrigatórios ausentes",
        });
      }

      const novoAtendimento = {
        id: currentId++,
        ...body,
      };

      atendimentos.push(novoAtendimento);

      return sendJson(res, 201, novoAtendimento);
    } catch (error) {
      return sendJson(res, 400, {
        erro: "JSON inválido",
      });
    }
  }

  sendJson(res, 404, { erro: "Rota não encontrada" });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
