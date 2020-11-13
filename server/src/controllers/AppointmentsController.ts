import { Request, Response } from 'express';
import db from '../database/connection';

export default class AppointmentsController {
    async index(request: Request, response: Response) {
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

        const consulta = await db('appointments')
            .where('id', appointment)
            .first();

        if (!consulta) {
            return response.status(401).json({
                error: 'Não existe uma consulta com esse id'
            })
        }

        return response.json(consulta);
    }

    async patient(request: Request, response: Response) {
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

        const consulta = await db('appointments')
            .where('patient_id', appointment);

        if (!consulta) {
            return response.status(401).json({
                error: 'Não existe uma consulta com esse paciente'
            })
        }

        return response.json(consulta);
    }

    async create(request: Request, response: Response) {
        const {
            forma,
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
                error: 'Token inválido'
            })
        }

        const patient = await db('patients')
            .where('id', patient_id)
            .first();

        if (!patient) {
            return response.status(401).json({
                error: 'Não existe paciente com esse id'
            })
        }

        try {
            const today = await db('appointments').insert({
                forma,
                tipo,
                patient_id
            });

            const today_id = today[0];

            await db('today').insert({
                id: today_id,
                patient_id: patient.id,
                nome: patient.nome,
                nome_mae: patient.nome_mae,
                forma,
                tipo
            });

        } catch (error) {
            return response.status(400).json({
                error: 'Id de paciente inválido'
            });
        }

        return response.status(204).send();
    }
}
