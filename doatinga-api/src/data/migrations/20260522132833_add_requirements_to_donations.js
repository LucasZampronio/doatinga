/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('donations', (table) => {
    table.text('requirements').defaultTo('Apresentar documento com foto (RG/CPF).');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('donations', (table) => {
    table.dropColumn('requirements');
  });
}
