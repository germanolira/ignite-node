import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// - Criar usuários
// - Listagem usuários
// - Edição usuários
// - Remoção usuários

// - HTTP
//   - Métodos HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma recurso do back-end
// POST => Criar uma recurso no back-end
// PUT => Atualizar uma recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar uma recurso do back-end

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
