var bookingsDAO = require('../dao/bookingsDAO');
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next){
    let response = await bookingsDAO.getBookings();
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})

module.exports = router;