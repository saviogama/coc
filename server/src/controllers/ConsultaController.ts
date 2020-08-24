import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConsultaController {
    async index(request: Request, response: Response) {
        const patient = request.body;
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

        if (!patient.cpf) {
            return response.status(400).json({
                error: 'Missing filters to search consulta'
            });
        }
        const consulta = await db('consulta')
            .where('consulta.patient_id', '=', patient.cpf as string);

        return response.json(consulta);
    }

    async create(request: Request, response: Response) {
        const {
            tipo,
            patient_id
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
                await db('consulta').insert({
                    tipo,
                    patient_id
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Invalid patient id'
                });
            }
        }
        return response.status(204).send();
    }
}
