import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConsultaController {
    async index(request: Request, response: Response) {
        const { consultas } = request.params;
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        const consulta = await db('consulta')
            .where('id', consultas)
            .first();

        if (!consulta) {
            return response.status(401).json({
                error: 'There is no one consulta with this id'
            })
        }

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

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        const patient = await db('patients')
            .where('cpf', patient_id)
            .first();

        if (!patient) {
            return response.status(401).json({
                error: 'There is no one patient with this cpf'
            })
        }

        try {
            const today = await db('consulta').insert({
                tipo,
                patient_id
            });

            const today_id = today[0];

            await db('today').insert({
                id: today_id,
                cpf: patient_id,
                nome: patient.nome,
                tipo
            });

        } catch (error) {
            return response.status(400).json({
                error: 'Invalid patient id'
            });
        }

        return response.status(204).send();
    }

    async update(request: Request, response: Response) {
        const {
            consulta_id,
            tipo
        } = request.body;

        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        } else {
            try {
                await db('consulta')
                    .where('id', consulta_id)
                    .update({
                        tipo
                    });
            } catch (error) {
                return response.status(400).json({
                    error: 'There is no one consulta with this id.'
                });
            }
        }
        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const {
            consulta_id
        } = request.body;

        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .select('id')
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        } else {
            try {
                await db('consulta')
                    .where('id', consulta_id)
                    .delete();
            } catch (error) {
                return response.status(400).json({
                    error: 'There is no one consulta with this id.'
                });
            }
        }
        return response.status(204).send();
    }
}
