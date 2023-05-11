import { randomUUID } from 'node:crypto';
import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './middlewares/database.js';

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

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)