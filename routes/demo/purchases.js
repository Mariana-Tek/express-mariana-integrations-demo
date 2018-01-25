const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('demo/purchases', {isPurchasesPage: true});
});

module.exports = router;
