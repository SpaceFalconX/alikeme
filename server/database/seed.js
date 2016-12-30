// const db = require('./config.js');

module.exports = (db) => {
	const users = db.Users.bulkCreate([{
	  username: "wasiff",
	  email: "wasiff@gmail.com",
	  password: "1"
	}, {
	  username: "isaac",
	  email: "isaac@gmail.com",
	  password: "1"
	}, {
	  username: "sevda",
	  email: "sevda@gmail.com",
	  password: "1"
	}], {
	  validate: true,
	  ignoreDuplicates: true
	});
	const categories = db.Categories.bulkCreate([{
    name: "coffee",
  }, {
    name: "startups",
  }, {
    name: "software development",
  }, {
    name: "fitness",
  }, {
    name: "nightlife",
  }, {
    name: "concerts",
  }, {
    name: "clubbing",
  }, {
    name: "dating",
	}])
	return Promise.all([users,categories])
}