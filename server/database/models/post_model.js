module.exports = (connection, Sequelize) => {
	const Posts = connection.define('posts', {
		id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
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
