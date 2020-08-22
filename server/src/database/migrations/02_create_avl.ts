import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('avl', table => {
        table.increments('id').primary();
        table.string('olho_direito');
        table.string('olho_esquerdo');
        table.string('olho_direito_esferico');
        table.string('olho_esquerdo_esferico');
        table.string('olho_direito_cilindro');
        table.string('olho_esquerdo_cilindro');
        table.string('olho_direito_eixo');
        table.string('olho_esquerdo_eixo');
        table.string('olho_direito_adicao');
        table.string('olho_esquerdo_adicao');

        table.integer('patient_id')
            .notNullable()
            .references('cpf')
            .inTable('patients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('avl');
}