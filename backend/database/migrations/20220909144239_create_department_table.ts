import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('department', function (table) {
    table.increments('id').primary();
    table.string('department_name', 128).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('department');
}

