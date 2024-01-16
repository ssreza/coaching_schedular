const { Client, Pool } = require('pg')
// const pgp = require('pg-promise')
const connectionString = "postgres://ekpsddoc:CjWTzXqFygiBVETbJApNL0YYLvhOvOJc@heffalump.db.elephantsql.com/ekpsddoc"
// const pool = new Pool({
//     user: 'ekpsddoc',
//     host: 'heffalump.db.elephantsql.com',
//     database: 'coaching_schedular',
//     password: 'CjWTzXqFygiBVETbJApNL0YYLvhOvOJc ',
//     port: 5432,
//      ssl: false, // Make sure to set this to true if your RDS instance requires SSL
// });
const knex = require('knex')({
  client: 'pg',
  connection: connectionString,
  searchPath: ['knex', 'public'],
});
const pool = new Pool({
    connectionString,
  })
// const cn = {
//     user: 'ekpsddoc',
//     host: 'heffalump.db.elephantsql.com',
//     database: 'coaching_schedular',
//     password: 'CjWTzXqFygiBVETbJApNL0YYLvhOvOJc ',
//     port: 5432,
// };
// const database = pgp("postgres://ekpsddoc:CjWTzXqFygiBVETbJApNL0YYLvhOvOJc@heffalump.db.elephantsql.com/ekpsddoc");

module.exports = {
  query: (text, params) => pool.query(text, params),
  knex:knex
  //database:database
};