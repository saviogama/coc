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

        const complete = await db('today')
            .where('id', today)
            .first()

        if (!user) {
            return response.status(401).json({
                error: 'Token inválido'
            })
        }

        if (!complete) {
            return response.status(400).json({
                error: 'Não existe nenhuma consulta com esse id'
            });
        }

        await db('today')
            .where('id', today)
            .delete();

        await db('history').insert({
            id: complete.id,
            patient_id: complete.patient_id,
            nome: complete.nome,
            nome_mae: complete.nome_mae,
            forma: complete.forma,
            tipo: complete.tipo
        });

        return response.status(204).send();
    }
}
