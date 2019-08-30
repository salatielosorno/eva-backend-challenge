var explorationsDAO = require('../dao/explorationsDAO');
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next){
    let explorations = await explorationsDAO.getExplorations();
    res.status(201).json(explorations);
})

module.exports = router;