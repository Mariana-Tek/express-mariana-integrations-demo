const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/register', {pageTitle: 'Register'});
});

module.exports = router;
