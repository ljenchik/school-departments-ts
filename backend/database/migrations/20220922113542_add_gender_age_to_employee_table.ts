import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('employee', function(table) {
        table.string('gender');
        table.integer('age');
    })
};


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table ('employee', table => {
        table.dropColumn('gender');
        table.dropColumn('age')
    })
    };



