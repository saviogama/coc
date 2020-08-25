import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConsultaController {
    async index(request: Request, response: Response) {
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (user.id != id) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        const today = await db('today');

        return response.json(today);
    }

    async create(request: Request, response: Response) {
        const {
            today
        } = request.body;

        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (user.id != id) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        } else {
            try {
                await db('today').insert({
                    id: today
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Invalid consulta id'
                });
            }
        }
        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const {
            today
        } = request.body;

        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (user.id != id) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        } else {
            try {
                await db('today')
                    .where('id', today)
                    .delete();
            } catch (error) {
                return response.status(400).json({
                    error: 'There is no one consult with this id.'
                });
            }
        }
        return response.status(204).send();
    }
}
