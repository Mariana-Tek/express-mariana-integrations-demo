var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('demo/index', {siteTitle: "Ohami Yoga", pageTitle: "Home"});
});

router.use('/login', require('./login'));
router.use('/schedule', require('./schedule'));
router.use('/store', require('./store'));

module.exports = router;
