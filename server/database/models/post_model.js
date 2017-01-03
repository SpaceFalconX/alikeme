module.exports = (connection, Sequelize) => {
	const Posts = connection.define('posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  	text: {
  		type: Sequelize.STRING, 
  		allowNull: false
  	}
	}, {
		underscored: true
	})
	return Posts;
}
