import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('patients', table => {
        table.integer('cpf', 11).primary().notNullable();
        table.string('nome').notNullable();
        table.string('rg');
        table.date('data_nascimento');
        table.string('reg');
        table.string('endereco_rua');
        table.integer('endereco_numero');
        table.string('endereco_bairro');
        table.string('nome_pai');
        table.string('nome_mae');
        table.integer('telefone');
        table.string('email');
        table.string('profissao');
        table.date('data_atendimento').notNullable();
        table.string('convenio');
        table.text('antecedentes_pessoais');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('patients');
}