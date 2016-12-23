const express = require('express');
const router = express.Router()
const auth = require('./routes/auth_router.js');
const user =  require('./routes/user_router.js');

router.use('/auth', auth)
router.use('/api', user)


module.exports = router;
