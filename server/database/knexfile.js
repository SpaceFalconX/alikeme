// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'io',
      database : 'alike_me',
      charset  : 'utf8'
    },
    debug : true
  }

}




/*** UNCOMMENT IN PRODUCTION ***/
// staging: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user:     'username',
//     password: 'password'
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// },

// production: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user:     'username',
//     password: 'password'
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// }

