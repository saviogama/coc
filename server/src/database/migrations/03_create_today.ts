import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('today', table => {
        table.string('id').primary();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('today');
}
