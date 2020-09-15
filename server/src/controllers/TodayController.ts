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

        const today = await db('today');

        return response.json(today);
    }

    async appointment(request: Request, response: Response) {
        const { appointment } = request.params;
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

        const consulta = await db('today')
            .where('id', appointment)
            .first();

        if (!consulta) {
            return response.status(401).json({
                error: 'Não existe nenhuma consulta com esse id'
            })
        }

        return response.json(consulta);
    }

    async delete(request: Request, response: Response) {
        const { today } = request.params;
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Token inválido'
            })
        } else {
            try {
                await db('today')
                    .where('id', today)
                    .delete();
            } catch (error) {
                return response.status(400).json({
                    error: 'Não existe nenhuma consulta com esse id'
                });
            }
        }
        return response.status(204).send();
    }
}
