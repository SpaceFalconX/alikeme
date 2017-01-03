module.exports = (connection, Sequelize) => {
	const Category = connection.define('categories', {
	  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	  },
	  name: { 
	  	type: Sequelize.STRING, 
	  	unique: true 
	  }
	}, {
		underscored: true
	})
	return Category;
}

