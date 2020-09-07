import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('today', table => {
        table.string('id').primary();
        table.string('cpf').notNullable();
        table.string('nome').notNullable();
        table.enu('tipo',
            ['curva_tensional',
                'fundo_de_olho',
                'teste_de_olhinho',
                'mapeamento_de_retina',
                'paquimetria',
                'gonioscopia',
                'pressao_intraocular']);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('today');
}
