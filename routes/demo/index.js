const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/index');
});

router.use('/account', require('./account'));
router.use('/cart', require('./cart'));
router.use('/login', require('./login'));
router.use('/locations', require('./locations'));
router.use('/purchase', require('./purchase'));
router.use('/register', require('./register'));
router.use('/reset', require('./reset'));
router.use('/schedule', require('./schedule'));

module.exports = router;
