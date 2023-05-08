import http from 'node:http';

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

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res.end('Listagens de usuários');
  }

  if (method === 'POST' && url === '/users') {
    return res.end('Criação de usuários');
  }

  return res.end('Hello World');
})

server.listen(3333)