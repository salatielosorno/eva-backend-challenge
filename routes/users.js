var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(201).send('respond with a resource');
});

module.exports = router;
