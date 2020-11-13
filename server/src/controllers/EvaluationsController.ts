import { Request, Response } from 'express';
import db from '../database/connection';

export default class EvaluationsController {
    async index(request: Request, response: Response) {
        const { evaluation } = request.params;
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

        const avaliacao = await db('evaluations')
            .where('consulta_id', evaluation)
            .first();

        if (!avaliacao) {
            return response.status(401).json({
                error: 'Não existe nenhuma avaliação com esse id'
            })
        }

        return response.json(avaliacao);
    }

    async create(request: Request, response: Response) {
        const {
            hda,
            longe_esferico_od,
            longe_esferico_oe,
            longe_cilindro_od,
            longe_cilindro_oe,
            longe_eixo_od,
            longe_eixo_oe,
            adicao,
            perto_esferico_od,
            perto_esferico_oe,
            perto_cilindro_od,
            perto_cilindro_oe,
            perto_eixo_od,
            perto_eixo_oe,
            avl_od,
            avl_oe,
            tonometria_od,
            tonometria_oe,
            biomicroscopia,
            fundoscopia,
            outros,
            consulta_id
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

        const verify = await db('evaluations')
            .where('consulta_id', consulta_id)
            .select('consulta_id')
            .first();

        if (!verify) {
            try {
                await db('evaluations').insert({
                    hda,
                    longe_esferico_od,
                    longe_esferico_oe,
                    longe_cilindro_od,
                    longe_cilindro_oe,
                    longe_eixo_od,
                    longe_eixo_oe,
                    adicao,
                    perto_esferico_od,
                    perto_esferico_oe,
                    perto_cilindro_od,
                    perto_cilindro_oe,
                    perto_eixo_od,
                    perto_eixo_oe,
                    avl_od,
                    avl_oe,
                    tonometria_od,
                    tonometria_oe,
                    biomicroscopia,
                    fundoscopia,
                    outros,
                    consulta_id
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Id de consulta inválido'
                });
            } finally {
                return response.status(204).send();
            }
        }
        else if (verify.consulta_id === consulta_id) {
            return response.status(401).json({
                error: 'Já existe uma avaliação para essa consulta'
            });
        }
        else {
            try {
                await db('evaluations').insert({
                    hda,
                    longe_esferico_od,
                    longe_esferico_oe,
                    longe_cilindro_od,
                    longe_cilindro_oe,
                    longe_eixo_od,
                    longe_eixo_oe,
                    adicao,
                    perto_esferico_od,
                    perto_esferico_oe,
                    perto_cilindro_od,
                    perto_cilindro_oe,
                    perto_eixo_od,
                    perto_eixo_oe,
                    avl_od,
                    avl_oe,
                    tonometria_od,
                    tonometria_oe,
                    biomicroscopia,
                    fundoscopia,
                    outros,
                    consulta_id
                });
            } catch (error) {
                return response.status(400).json({
                    error: 'Id de consulta inválido'
                });
            }
        }

        return response.status(204).send();
    }
}
