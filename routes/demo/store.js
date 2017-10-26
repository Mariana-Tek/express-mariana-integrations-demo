const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/store', {pageTitle: 'Store'});
});

module.exports = router;
