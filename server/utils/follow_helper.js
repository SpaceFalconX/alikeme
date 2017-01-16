module.exports =  {
  followers: (req, res, next) => {
    User.where('id', req.params.id)
    .fetch({withRelated: ['followers']})
    .then((user) => {
      res.json(user.related('followers'))
    })
    .catch((err) => {
      console.error(err);
      res.json({error: {message: err.message}})
    });
  },

  following: (req, res, next) => {
    User.where('id', req.params.id)
    .fetch({withRelated: ['following']})
    .then((user) => {
      console.log("FOLLOWING, ", user.related('following'))
      next(user.related('following'))
    })
    .catch((err) => {
      console.error(err);
      return next({error: {message: err.message}})
    });
  }
}