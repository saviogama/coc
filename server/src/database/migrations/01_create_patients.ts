import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('patients', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cpf');
        table.string('rg');
        table.string('data_nascimento');
        table.string('idade');
        table.string('reg');
        table.string('rua');
        table.string('numero');
        table.string('bairro');
        table.string('nome_pai');
        table.string('nome_mae');
        table.string('telefone');
        table.string('email');
        table.string('profissao');
        table.string('convenio');
        table.text('antecedentes_pessoais');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('patients');
}