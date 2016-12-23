const Sequelize = require('sequelize')
const dbConnection = new Sequelize('alikeMe','root','123');

const User = dbConnection.define('user', {
  username: {type: Sequelize.STRING, allowNull: false, unique: true},
  password: {type: Sequelize.TEXT, allowNull: false}
})

dbConnection.sync();

module.exports = dbConnection;