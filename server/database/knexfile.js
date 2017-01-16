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

  development: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-04.cleardb.net',
      user     : 'b550a6c003d3e3',
      password : '8063025e',
      database : 'heroku_8adb93462bc531e',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
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

