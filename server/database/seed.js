module.exports = (db) => {
	const user1 = db.User.create({
	  username: "wasiff",
	  email: "wasiff@gmail.com",
	  password: "1"
	}); 

	const user2 = db.User.create({
	  username: "isaac",
	  email: "isaac@gmail.com",
	  password: "1"
	});
	
	const user3 = db.User.create({
	  username: "sevda",
	  email: "sevda@gmail.com",
	  password: "1"
	});
	// const categories = db.Category.bulkCreate([{
 //    name: "coffee",
 //  }, {
 //    name: "startups",
 //  }, {
 //    name: "software development",
 //  }, {
 //    name: "fitness",
 //  }, {
 //    name: "nightlife",
 //  }, {
 //    name: "concerts",
 //  }, {
 //    name: "clubbing",
 //  }, {
 //    name: "dating",
	// }, {
	// 	validate: true,
	//   ignoreDuplicates: false
	// }])
	return Promise.all([user1,user2, user3])
}