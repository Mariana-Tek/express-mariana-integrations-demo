const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/locations', {pageTitle: 'Locations'});
});

module.exports = router;
