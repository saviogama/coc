import { Request, Response } from 'express';
import db from '../database/connection';

export default class RefracaoController {
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
                error: 'Missing filters to search refracao'
            });
        }
        const refracao = await db('refracao')
            .where('refracao.pacient_id', '=', patient.cpf as string);
        return response.json(refracao);
    }

    async create(request: Request, response: Response) {
        const {
            olho_direito,
            olho_esquerdo,
            olho_direito_esferico,
            olho_esquerdo_esferico,
            olho_direito_cilindro,
            olho_esquerdo_cilindro,
            olho_direito_eixo,
            olho_esquerdo_eixo,
            olho_direito_adicao,
            olho_esquerdo_adicao,
            olho_direito_dp,
            olho_esquerdo_dp,
            avl_olho_direito,
            avl_olho_esquerdo,
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
                await db('refracao').insert({
                    olho_direito,
                    olho_esquerdo,
                    olho_direito_esferico,
                    olho_esquerdo_esferico,
                    olho_direito_cilindro,
                    olho_esquerdo_cilindro,
                    olho_direito_eixo,
                    olho_esquerdo_eixo,
                    olho_direito_adicao,
                    olho_esquerdo_adicao,
                    olho_direito_dp,
                    olho_esquerdo_dp,
                    avl_olho_direito,
                    avl_olho_esquerdo,
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
