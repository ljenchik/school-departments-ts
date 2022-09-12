const environment = process.env.ENVIRONMENT || "development";
const config = require("../database/knexfile.ts")[environment];
export const knex = require("knex")(config);