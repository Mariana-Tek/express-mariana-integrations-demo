var express = require('express');
var router = express.Router({mergeParams: true});
var endpoint = require('./endpoint');

/* GET home page. */
router.get('/:version', function(req, res, next) {
  res.render('demo/index', { endpoint: req.params.endpoint, version: req.params.version });
});

module.exports = router;
