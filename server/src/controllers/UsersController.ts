import { Request, Response } from 'express';
import db from '../database/connection';

export default class UsersController {
    async index(request: Request, response: Response) {
        const users = await db('users');
        
        return response.json(users);
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
                    error: 'Invalid id'
                });
            }
        } else {
            return response.status(400).json({
                error: 'Invalid master key'
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
            .select('password')
            .first();

        if (user.password != password) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        return response.json(id);
    }
}
