const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/index');
});

router.use('/login', require('./login'));
router.use('/location', require('./location'));
router.use('/store', require('./store'));

module.exports = router;
