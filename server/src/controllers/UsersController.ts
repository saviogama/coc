import { Request, Response } from 'express';
import db from '../database/connection';

export default class UsersController {
    async index(request: Request, response: Response) {
        const acess = request.headers.authorization;
        const users = await db('users');

        if (acess === 'privileges') {
            return response.json(users);
        }

        return response.status(400).json({
            error: 'Chave mestre inválida'
        });
    }

    async create(request: Request, response: Response) {
        const {
            id,
            password,
            type,
        } = request.body;

        const acess = request.headers.authorization;

        if (acess === 'privileges') {
            try {
                await db('users').insert({
                    id,
                    password,
                    type
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Já existe um usuário cadastrado com esse id'
                });
            }
        } else {
            return response.status(400).json({
                error: 'Chave mestre inválida'
            });
        }
        return response.send();
    }

    async login(request: Request, response: Response) {
        const {
            id,
            password
        } = request.body;

        const user = await db('users')
            .where('id', id)
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Não foi encontrado nenhum usuário com esse id'
            })
        }

        if (user.password != password) {
            return response.status(401).json({
                error: 'Senha inválida'
            })
        }

        return response.json(user);
    }
}
