module.exports = (connection, Sequelize) => {
	const Comments = connection.define('comments', {
		id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
	  text: { 
	  	type: Sequelize.TEXT 
	  }
	}, {
		underscored: true
	})
	return Comments;
}

