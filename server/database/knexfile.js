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
    }
  }
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host     : 'us-cdbr-iron-east-04.cleardb.net',
  //     user     : 'b2c1e11015ee11',
  //     password : '90bb8fcd',
  //     database : 'heroku_e49323e7b0a627f',
  //     charset  : 'utf8'
  //   }
  // },
  // migrations: {
  //   tableName: 'knex_migrations'
  // }
};
