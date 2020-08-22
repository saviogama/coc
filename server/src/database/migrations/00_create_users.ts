import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.string('id', 11).primary().notNullable();
        table.string('password', 16).notNullable();
        table.integer('type').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}