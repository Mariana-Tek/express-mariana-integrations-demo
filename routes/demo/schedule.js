const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/schedule', {pageTitle: 'Schedule'});
});

module.exports = router;
