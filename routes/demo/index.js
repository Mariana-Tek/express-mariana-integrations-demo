const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/index', {pageTitle: 'Home'});
});

router.use('/login', require('./login'));
router.use('/schedule', require('./schedule'));
router.use('/store', require('./store'));

module.exports = router;
