import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('avaliacao', table => {
        table.increments('id').primary();
        table.string('avl_olho_direito');
        table.string('avl_olho_esquerdo');
        table.text('hda');
        table.string('tonometria_olho_direito');
        table.string('tonometria_olho_esquerdo');
        table.text('inspecao');
        table.string('inspecao_ppc');
        table.string('refracao_olho_direito');
        table.string('refracao_olho_esquerdo');
        table.string('refracao_olho_direito_esferico');
        table.string('refracao_olho_esquerdo_esferico');
        table.string('refracao_olho_direito_cilindro');
        table.string('refracao_olho_esquerdo_cilindro');
        table.string('refracao_olho_direito_eixo');
        table.string('refracao_olho_esquerdo_eixo');
        table.string('refracao_olho_direito_adicao');
        table.string('refracao_olho_esquerdo_adicao');
        table.string('dp');
        table.text('biomicroscopia');
        table.text('fungoscopia');

        table.integer('consulta_id')
            .notNullable()
            .references('id')
            .inTable('consulta')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('avaliacao');
}