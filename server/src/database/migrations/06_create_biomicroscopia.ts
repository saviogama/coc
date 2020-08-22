import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('biomicroscopia', table => {
        table.increments('id').primary();
        table.string('pal');
        table.string('cil');
        table.string('pt');
        table.string('lag');
        table.string('conj');

        table.integer('patient_id')
            .notNullable()
            .references('cpf')
            .inTable('patients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('biomicroscopia');
}
