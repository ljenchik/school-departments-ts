
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 require('ts-node/register');

 const environment = process.env.NODE_ENV || 'development'

module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "School-ts",
      user:     "Olena",
      password: "1234"
    }
  }
};
