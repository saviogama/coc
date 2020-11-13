import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('evaluations', table => {
        table.increments('id').primary();
        table.text('hda');
        table.string('longe_esferico_od');
        table.string('longe_esferico_oe');
        table.string('longe_cilindro_od');
        table.string('longe_cilindro_oe');
        table.string('longe_eixo_od');
        table.string('longe_eixo_oe');
        table.string('adicao');
        table.string('perto_esferico_od');
        table.string('perto_esferico_oe');
        table.string('perto_cilindro_od');
        table.string('perto_cilindro_oe');
        table.string('perto_eixo_od');
        table.string('perto_eixo_oe');
        table.string('avl_od');
        table.string('avl_oe');
        table.string('tonometria_od');
        table.string('tonometria_oe');
        table.text('biomicroscopia');
        table.text('fundoscopia');
        table.text('outros');

        table.integer('consulta_id')
            .notNullable()
            .references('id')
            .inTable('appointments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('evaluations');
}