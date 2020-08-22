import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('tonometria', table => {
        table.increments('id').primary();
        table.string('olho_direito');
        table.string('olho_esquerdo');
        table.string('kd');
        table.string('ke');
        table.string('ctd');
        table.string('cte');

        table.integer('patient_id')
            .notNullable()
            .references('cpf')
            .inTable('patients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('tonometria');
}
