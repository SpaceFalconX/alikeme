module.exports = (connection, Sequelize) => {
	const Comments = connection.define('comments', {
	  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	  },
	  text: { 
	  	type: Sequelize.TEXT 
	  }
	}, {
		underscored: true
	})
	return Comments;
}

