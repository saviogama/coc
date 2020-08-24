import { Request, Response } from 'express';
import db from '../database/connection';

export default class AvaliacaoController {
    async index(request: Request, response: Response) {
        const consulta = request.body;
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

        if (!consulta.id) {
            return response.status(400).json({
                error: 'Missing filters to search avaliacao'
            });
        }
        const avaliacao = await db('avaliacao')
            .where('avaliacao.pacient_id', '=', consulta.id as string);

        return response.json(avaliacao);
    }

    async create(request: Request, response: Response) {
        const {
            avl_olho_direito,
            avl_olho_esquerdo,
            hda,
            tonometria_olho_direito,
            tonometria_olho_esquerdo,
            inspecao,
            inspecao_ppc,
            refracao_olho_direito,
            refracao_olho_esquerdo,
            refracao_olho_direito_esferico,
            refracao_olho_esquerdo_esferico,
            refracao_olho_direito_cilindro,
            refracao_olho_esquerdo_cilindro,
            refracao_olho_direito_eixo,
            refracao_olho_esquerdo_eixo,
            refracao_olho_direito_adicao,
            refracao_olho_esquerdo_adicao,
            dp,
            biomicroscopia,
            fungoscopia,
            consulta_id
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
                await db('avaliacao').insert({
                    avl_olho_direito,
                    avl_olho_esquerdo,
                    hda,
                    tonometria_olho_direito,
                    tonometria_olho_esquerdo,
                    inspecao,
                    inspecao_ppc,
                    refracao_olho_direito,
                    refracao_olho_esquerdo,
                    refracao_olho_direito_esferico,
                    refracao_olho_esquerdo_esferico,
                    refracao_olho_direito_cilindro,
                    refracao_olho_esquerdo_cilindro,
                    refracao_olho_direito_eixo,
                    refracao_olho_esquerdo_eixo,
                    refracao_olho_direito_adicao,
                    refracao_olho_esquerdo_adicao,
                    dp,
                    biomicroscopia,
                    fungoscopia,
                    consulta_id
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Invalid consulta id'
                });
            }
        }
        return response.status(204).send();
    }
}
