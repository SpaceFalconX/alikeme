const bcrypt = require('bcryptjs');
const _ = require('underscore');

module.exports = (connection, Sequelize) => {
	const Users = connection.define('users', {
		id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
	  username: { 
	  	type: Sequelize.STRING, 
	  	allowNull: false, 
	  	unique: true 
	  },
	  password: { 
	  	type: Sequelize.STRING, 
	  	allowNull: false 
	  },
	  email: { 
	  	type: Sequelize.STRING, 
	  	allowNull: false, 
	  	unique: true 
	  },
		avatar: {
			type: Sequelize.STRING 
		}
	}, {
		underscored: true
	})
	return Users;
}



// validate : {
//   		len: {
//   			args: [2,10],
//   			msg: 'Username must be between 2 and 10 characters long'
//   		},
//   		isAlphanumeric: {
//   			args: true,
//   			msg: 'Username must contain letters and numbers only'
//   		}
//   	}
// validate: {
//   		isEmail: true
//   	}

// , {
// 		hooks: {
// 			beforeBulkCreate (users) {
// 				_.each(users, (user) => (user.password = bcrypt.hashSync(user.password, 8)));
// 			},
// 	    beforeCreate (user) {
// 	      user.password = bcrypt.hashSync(user.password, 8);
// 	    }
// 		}

// .then(() => (
//   User.bulkCreate([{
//     username: "wasiff",
//     email: "wasiff@gmail.com",
//     password: "1"
//   }, {
//     username: "isaac",
//     email: "isaac@gmail.com",
//     password: "1"
//   }, {
//     username: "sevda",
//     email: "sevda@gmail.com",
//     password: "1"
//   }], {
//     validate: true,
//     ignoreDuplicates: true
//   })
// ))
// .then((users) => (
//   _.each(users, (user) => ( console.log('Created user:', user.dataValues.username)))
// ))
// .then(()=> {
// 	User.findOne({where: {username: "sevda"}})
// 	.then((user)=> {
// 		Post.create({
// 			text: "My first post!",
// 			userId: user.id
// 		})
// 	})
// })

// .then(() => (
//   Category.bulkCreate([{
// 	    name: "coffee",
// 	  }, {
// 	    name: "startups",
// 	  }, {
// 	    name: "software development",
// 	  }, {
// 	    name: "fitness",
// 	  }, {
// 	    name: "nightlife",
// 	  }, {
// 	    name: "concerts",
// 	  }, {
// 	    name: "clubbing",
// 	  }, {
// 	    name: "dating",
// 	  }
// 	])
// ))
// .catch((error) => (
//   console.log(error)
// ))

// .then(() => (
//   User.bulkCreate([{
//     username: "wasiff",
//     email: "wasiff@gmail.com",
//     password: "1"
//   }, {
//     username: "isaac",
//     email: "isaac@gmail.com",
//     password: "1"
//   }, {
//     username: "sevda",
//     email: "sevda@gmail.com",
//     password: "1"
//   }], {
//     validate: true,
//     ignoreDuplicates: true
//   })
// ))
// .then((users) => (
//   _.each(users, (user)=>( console.log('Created user:', user.dataValues.username)))
// ))
// .then(()=> {
// 	User.findOne({where: {username: "sevda"}})
// 	.then((user)=> {
// 		Post.create({
// 			text: "My first post!",
// 			userId: user.id
// 		})
// 	})
// })
// .catch((error) => (
//   console.log(error)
// ))


