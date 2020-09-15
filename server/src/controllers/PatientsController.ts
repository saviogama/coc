import { Request, Response } from 'express';
import db from '../database/connection';

export default class PatientsController {
    async all(request: Request, response: Response) {
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

        const patients = await db('patients');

        return response.json(patients);
    }

    async index(request: Request, response: Response) {
        const filters = request.query;
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

        if (!filters.nome) {
            return response.status(400).json({
                error: 'Falta de filtros para buscar o paciente'
            });
        }

        const patients = await db('patients')
            .where('nome', filters.nome as string);

        return response.json(patients);
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            cpf,
            rg,
            data_nascimento,
            idade,
            reg,
            rua,
            numero,
            bairro,
            nome_pai,
            nome_mae,
            telefone,
            email,
            profissao,
            convenio,
            antecedentes_pessoais
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
        } else {
            await db('patients').insert({
                nome,
                cpf,
                rg,
                data_nascimento,
                idade,
                reg,
                rua,
                numero,
                bairro,
                nome_pai,
                nome_mae,
                telefone,
                email,
                profissao,
                convenio,
                antecedentes_pessoais
            });
        }
        return response.status(204).send();
    }

    async update(request: Request, response: Response) {
        const {
            nome,
            cpf,
            rg,
            data_nascimento,
            idade,
            reg,
            rua,
            numero,
            bairro,
            nome_pai,
            nome_mae,
            telefone,
            email,
            profissao,
            convenio,
            antecedentes_pessoais
        } = request.body;
        const { patient } = request.params;
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

        const result = await db('patients')
            .where('id', patient)
            .first();

        if (!result) {
            return response.status(401).json({
                error: 'Não existe nenhum paciente com esse id'
            });
        }

        await db('patients')
            .where('id', patient)
            .update({
                nome,
                cpf,
                rg,
                data_nascimento,
                idade,
                reg,
                rua,
                numero,
                bairro,
                nome_pai,
                nome_mae,
                telefone,
                email,
                profissao,
                convenio,
                antecedentes_pessoais
            });

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { patient } = request.params;
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Token inválido'
            })
        }

        const result = await db('patients')
            .where('id', patient)
            .first();

        if (!result) {
            return response.status(401).json({
                error: 'Não existe um paciente com esse id'
            })
        }

        await db('patients')
            .where('id', patient)
            .delete();

        return response.status(204).send();
    }
}
