import {Database} from "./database.js";
import { randomUUID } from 'node:crypto';
import {buildRoutePath} from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: async(req, res) => {
      const { search } = req.query;
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null);

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: async(req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user);

      return res.writeHead(201).end('Usuário criado com sucesso!')
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: async(req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: async(req, res) => {
      const { id } = req.params;

      const { name, email } = req.body;

      const data = {
        name,
        email
      }

      database.update('users', id, data);

      return res.writeHead(204).end()
    }
  }
]