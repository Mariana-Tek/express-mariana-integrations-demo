const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/terms-of-service', {pageTitle: 'Terms of Service'});
});

module.exports = router;
