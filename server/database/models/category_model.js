module.exports = (connection, Sequelize) => {
	const Category = connection.define('categories', {
		id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
	  name: { 
	  	type: Sequelize.STRING, 
	  	unique: true 
	  },
	  value: { 
	  	type: Sequelize.BOOLEAN, 
	  	defaultValue: false 
	  } 
	}, {
		underscored: true
	})
	return Category;
}

