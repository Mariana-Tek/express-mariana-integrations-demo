const express = require('express');

const router = express.Router();

router.get('/:locationId', (req, res) => {
    res.render('demo/cart', {locationId: req.params.locationId});
});

module.exports = router;
