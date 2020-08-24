import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('patients', table => {
        table.integer('cpf', 11).primary().notNullable();
        table.string('nome').notNullable();
        table.string('rg');
        table.date('data_nascimento');
        table.integer('idade');
        table.string('reg');
        table.string('rua');
        table.integer('numero');
        table.string('bairro');
        table.string('nome_pai');
        table.string('nome_mae');
        table.integer('telefone');
        table.string('email');
        table.string('profissao');
        table.string('convenio');
        table.text('antecedentes_pessoais');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('patients');
}