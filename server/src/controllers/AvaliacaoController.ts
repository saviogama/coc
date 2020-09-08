import { Request, Response } from 'express';
import db from '../database/connection';

export default class AvaliacaoController {
    async index(request: Request, response: Response) {
        const { avaliacoes } = request.params;
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

        const avaliacao = await db('avaliacao')
            .where('consulta_id', avaliacoes)
            .first();

        if (!avaliacao) {
            return response.status(401).json({
                error: 'There is no one avaliacao with this id'
            })
        }

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

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        const verify = await db('avaliacao')
            .where('consulta_id', consulta_id)
            .select('consulta_id')
            .first();

        if (!verify) {
            try {
                await db('avaliacao').insert({
                    avl_olho_direito,
                    avl_olho_esquerdo,
                    hda,
                    tonometria_olho_direito,
                    tonometria_olho_esquerdo,
                    inspecao,
                    inspecao_ppc,
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
            } finally {
                return response.status(204).send();
            }
        }
        else if (verify.consulta_id === consulta_id) {
            return response.status(401).json({
                error: 'There is already a avaliacao registered with that consulta.'
            })
        }
        else {
            try {
                await db('avaliacao').insert({
                    avl_olho_direito,
                    avl_olho_esquerdo,
                    hda,
                    tonometria_olho_direito,
                    tonometria_olho_esquerdo,
                    inspecao,
                    inspecao_ppc,
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

    async update(request: Request, response: Response) {
        const {
            avaliacao_id,
            avl_olho_direito,
            avl_olho_esquerdo,
            hda,
            tonometria_olho_direito,
            tonometria_olho_esquerdo,
            inspecao,
            inspecao_ppc,
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
            fungoscopia
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
                await db('avaliacao')
                    .where('id', avaliacao_id)
                    .update({
                        avl_olho_direito: avl_olho_direito,
                        avl_olho_esquerdo: avl_olho_esquerdo,
                        hda: hda,
                        tonometria_olho_direito: tonometria_olho_direito,
                        tonometria_olho_esquerdo: tonometria_olho_esquerdo,
                        inspecao: inspecao,
                        inspecao_ppc: inspecao_ppc,
                        refracao_olho_direito_esferico: refracao_olho_direito_esferico,
                        refracao_olho_esquerdo_esferico: refracao_olho_esquerdo_esferico,
                        refracao_olho_direito_cilindro: refracao_olho_direito_cilindro,
                        refracao_olho_esquerdo_cilindro: refracao_olho_esquerdo_cilindro,
                        refracao_olho_direito_eixo: refracao_olho_direito_eixo,
                        refracao_olho_esquerdo_eixo: refracao_olho_esquerdo_eixo,
                        refracao_olho_direito_adicao: refracao_olho_direito_adicao,
                        refracao_olho_esquerdo_adicao: refracao_olho_esquerdo_adicao,
                        dp: dp,
                        biomicroscopia: biomicroscopia,
                        fungoscopia: fungoscopia
                    });
            } catch (error) {
                return response.status(400).json({
                    error: 'There is no one avaliacao with this id.'
                });
            }
        }
        return response.status(204).send();
    }
}
