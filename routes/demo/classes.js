const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/classes', {pageTitle: 'Classes'});
});

module.exports = router;
