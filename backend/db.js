const { Client, Pool } = require('pg')
// const pgp = require('pg-promise')
const connectionString = "postgres://ekpsddoc:CjWTzXqFygiBVETbJApNL0YYLvhOvOJc@heffalump.db.elephantsql.com/ekpsddoc"

const knex = require('knex')({
  client: 'pg',
  connection: connectionString,
  searchPath: ['knex', 'public'],
});
const pool = new Pool({
    connectionString,
  })


module.exports = {
  query: (text, params) => pool.query(text, params),
  knex:knex
  //database:database
};
