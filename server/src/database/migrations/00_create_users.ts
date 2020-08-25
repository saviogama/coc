import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.string('id').primary().notNullable();
        table.string('password').notNullable();
        table.integer('type').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}