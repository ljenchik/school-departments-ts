import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
return knex.schema
.createTable('employee', function (table) {
table.increments('id').primary();
table.string('name', 128).notNullable();
table.string('role', 64).notNullable();
table.date('dob').notNullable();
table.string('address', 128).notNullable();
table.string('phone', 128).notNullable();
table.string('email', 64).notNullable();
table.double('salary').notNullable();
table.date('start_date').notNullable();
table.string('photo');
table.integer('department_id').notNullable();
table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
table.dateTime('updated_at');
table.unique(['name', 'dob']);
table.foreign('department_id').references('id').inTable('department');
})
};

export async function down(knex: Knex): Promise<void> {
return knex.schema.dropTable('employee');
}