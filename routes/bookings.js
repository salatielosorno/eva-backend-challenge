var bookingsDAO = require('../dao/bookingsDAO');
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    let match = null;
    if (!req.query.clinic || !req.query.frametime) return next('route')

    if(!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada."})

    match = { 
        clinicName: req.query.clinic,
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    let response = await bookingsDAO.getBookings(match);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})

router.get('/', async function (req, res, next) {
    let match = null;
    if (!req.query.clinic) return next('route')

    match = { clinicName: req.query.clinic };

    let response = await bookingsDAO.getBookings(match);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {
    let match = null;

    if (!req.query.frametime) return next('route');

    if(!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada."})

    match = {
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    let response = await bookingsDAO.getBookings(match);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {

    let page = 1;

    if(req.query.page)
        page = req.query.page;

    let response = await bookingsDAO.getBookings(null, page);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})

module.exports = router;