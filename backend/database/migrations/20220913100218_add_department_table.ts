import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('department', function (table) {
    table.increments('id').primary();
    table.string('department_name', 128).unique();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at');
    table.string('image');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('department');
}

