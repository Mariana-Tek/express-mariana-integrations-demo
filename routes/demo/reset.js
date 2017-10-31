const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/reset', {pageTitle: 'Reset'});
});

module.exports = router;
