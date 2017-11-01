const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/cart', {pageTitle: 'Cart'});
});

module.exports = router;
