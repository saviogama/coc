import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('inspecao', table => {
        table.increments('id').primary();
        table.string('descricao');
        table.string('ppc');

        table.integer('patient_id')
            .notNullable()
            .references('cpf')
            .inTable('patients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('inspecao');
}
