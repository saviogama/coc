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
                error: 'Not authorized'
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
                error: 'Not authorized'
            })
        }

        if (!filters.cpf) {
            return response.status(400).json({
                error: 'Missing filters to search patients'
            });
        }

        const patients = await db('patients')
            .where('patients.cpf', '=', filters.cpf as string);

        return response.json(patients);
    }

    async create(request: Request, response: Response) {
        const {
            cpf,
            nome,
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
                error: 'Not authorized'
            })
        } else {
            try {
                await db('patients').insert({
                    cpf,
                    nome,
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
            } catch (error) {
                return response.status(400).json({
                    error: 'There is already a patient registered with that CPF.'
                });
            }
        }
        return response.status(204).send();
    }

    async update(request: Request, response: Response) {
        const {
            cpf,
            nome,
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
                error: 'Not authorized'
            })
        }

        const patient = await db('patients')
            .where('cpf', cpf)
            .first();

        if (!patient) {
            return response.status(401).json({
                error: 'There is no one patient with this cpf'
            });
        }

        try {
            await db('patients')
                .where('cpf', cpf)
                .update({
                    nome,
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
        } catch (error) {
            return response.status(400).json({
                error: 'There is no one patient with this cpf.'
            });
        }

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { cpf } = request.params;
        const id = request.headers.authorization;

        const user = await db('users')
            .where('id', id)
            .first();

        if (!user) {
            return response.status(401).json({
                error: 'Not authorized'
            })
        }

        const patient = await db('patients')
            .where('cpf', cpf)
            .first();

        if (!patient) {
            return response.status(401).json({
                error: 'There is no one patient with this cpf'
            })
        }

        try {
            await db('patients')
                .where('cpf', cpf)
                .delete();
        } catch (error) {
            return response.status(400).json({
                error: 'There is no one patient with this cpf.'
            });
        }

        return response.status(204).send();
    }
}
