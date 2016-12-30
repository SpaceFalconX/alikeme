module.exports = (connection, Sequelize) => {
	const PostsCategories = connection.define('posts_categories', {
		
	}, {
		underscored: true
	})
	return PostsCategories;
}