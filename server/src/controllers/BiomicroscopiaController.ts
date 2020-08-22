import { Request, Response } from 'express';
import db from '../database/connection';

export default class BiomicroscopiaController {
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
                error: 'Missing filters to search biomicroscopia'
            });
        }
        const biomicroscopia = await db('biomicroscopia')
            .where('biomicroscopia.pacient_id', '=', patient.cpf as string);
        return response.json(biomicroscopia);
    }

    async create(request: Request, response: Response) {
        const {
            pal,
            cil,
            pt,
            lag,
            conj,
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
                await db('biomicroscopia').insert({
                    pal,
                    cil,
                    pt,
                    lag,
                    conj,
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
