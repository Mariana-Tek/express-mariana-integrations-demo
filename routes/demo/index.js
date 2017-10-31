const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/index');
});

router.use('/account', require('./account'));
router.use('/login', require('./login'));
router.use('/location', require('./location'));
router.use('/register', require('./register'));
router.use('/reset', require('./reset'));
router.use('/store', require('./store'));

module.exports = router;
