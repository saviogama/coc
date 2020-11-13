import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConsultaController {
    async index(request: Request, response: Response) {
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Token inválido'
            })
        }

        const today = await db('history');

        return response.json(today);
    }

    async delete(request: Request, response: Response) {
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Token inválido'
            })
        }

        await db('history')
            .delete();
           
        return response.status(204).send();
    }
}
