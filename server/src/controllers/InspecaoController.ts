import { Request, Response } from 'express';
import db from '../database/connection';

export default class InspecaoController {
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
                error: 'Missing filters to search inspecao'
            });
        }
        const inspecao = await db('inspecao')
            .where('inspecao.pacient_id', '=', patient.cpf as string);
        return response.json(inspecao);
    }

    async create(request: Request, response: Response) {
        const {
            descricao,
            ppc,
            pacient_id
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
                await db('inspecao').insert({
                    descricao,
                    ppc,
                    pacient_id
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
