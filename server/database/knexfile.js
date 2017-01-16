// Update with your config settings.
module.exports = {
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host     : 'localhost',
  //     user     : 'root',
  //     password : 'io',
  //     database : 'alike_me',
  //     charset  : 'utf8'
  //   }
  // },
  production: {
    client: 'mysql',
    connection: {
      host     : 'us-cdbr-iron-east-04.cleardb.net',
      user     : 'b2c1e11015ee11',
      password : '90bb8fcd',
      database : 'heroku_e49323e7b0a627f',
      charset  : 'utf8'
    }
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

