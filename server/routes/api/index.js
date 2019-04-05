const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/forum', require('./forum'));

module.exports = router;