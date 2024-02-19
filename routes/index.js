var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Database App', info: 'Welcome to the Contact Database Application!', name: 'Manish Chandrani', email: 'mchandrani@hawk.iit.edu' });
});

module.exports = router;
