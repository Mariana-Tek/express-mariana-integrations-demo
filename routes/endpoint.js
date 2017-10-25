var express = require('express');
var router = express.Router({mergeParams: true});
var version = require('./version');

router.get('/:endpoint', function(req, res, next) {
  res.render('home', { endpoint: req.params.endpoint });
});

router.use('/:endpoint/version', version);

module.exports = router;
