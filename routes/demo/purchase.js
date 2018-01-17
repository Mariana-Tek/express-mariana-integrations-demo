const express = require('express');

const router = express.Router();

router.get('/:locationId', (req, res) => {
    res.render('demo/purchase', {locationId: req.params.locationId, pageTitle: 'Purchase'});
});

module.exports = router;
