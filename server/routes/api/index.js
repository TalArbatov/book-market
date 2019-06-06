const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/forum', require('./forum'));
router.use('/account', require('./account'));
router.use('/upload', require('./upload'))
module.exports = router;