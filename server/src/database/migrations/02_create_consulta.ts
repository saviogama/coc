import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('consulta', table => {
        table.increments('id').primary();
        table.enu('tipo',
            ['curva_tensional',
                'fundo_de_olho',
                'teste_de_olhinho',
                'mapeamento_de_retina',
                'paquimetria',
                'gonioscopia',
                'pressao_intraocular']);
        table.timestamp('created_at')
            .defaultTo('now()')
            .notNullable();

        table.integer('patient_id')
            .notNullable()
            .references('cpf')
            .inTable('patients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('consulta');
}
