var bookingsDAO = require('../dao/bookingsDAO');
var express = require('express');
var router = express.Router();
router.get('/', async function (req, res, next) {
    let match = null
    let matchMedications = null;

    if (!req.query.clinic || !req.query.frametime || !req.query.medication)
        return next('route')

    if (!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada." })

    match = {
        clinicName: req.query.clinic,
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    matchMedications = getMedicationConsumed(req.query.mode, req.query.medication);

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page);
    else
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {
    let match = null
    let matchMedications = null;

    if (!req.query.frametime || !req.query.medication)
        return next('route')

    if (!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada." })

    match = {
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    matchMedications = getMedicationConsumed(req.query.mode, req.query.medication);

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page);
    else
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {
    let match = null
    let matchMedications = null;

    if (!req.query.clinic || !req.query.medication)
        return next('route')

    match = {
        clinicName: req.query.clinic
    };

    matchMedications = getMedicationConsumed(req.query.mode, req.query.medication);

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page);
    else
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})

router.get('/', async function (req, res, next) {
    let matchMedications = null;

    if (!req.query.medication)
        return next('route');

    matchMedications = getMedicationConsumed(req.query.mode, req.query.medication);

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, null, req.query.page);
    else
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})

router.get('/', async function (req, res, next) {
    let match = null;
    if (!req.query.clinic || !req.query.frametime) return next('route')

    if (!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada." })

    match = {
        clinicName: req.query.clinic,
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(match, req.query.page);
    else
        response = await bookingsDAO.getBookings(match);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})

router.get('/', async function (req, res, next) {
    let match = null;
    if (!req.query.clinic) return next('route')

    match = { clinicName: req.query.clinic };

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(match, req.query.page);
    else
        response = await bookingsDAO.getBookings(match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {
    let match = null;

    if (!req.query.frametime) return next('route');

    if (!req.query.frametime.start || !req.query.frametime.end)
        return res.status(400).json({ message: "Petición mal formada." })

    match = {
        'datetime': {
            '$gte': req.query.frametime.start,
            '$lt': req.query.frametime.end
        }
    };

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(match, req.query.page);
    else
        response = await bookingsDAO.getBookings(match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(null, req.query.page);
    else
        response = await bookingsDAO.getBookings();

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})

function getMedicationConsumed(mode, medication){
    if (!mode){
        return {
            medication: {
                '$all': medication
            }
        }
    }
    else {
        if (mode == "LAX"){
            return {
                medication: {
                    '$in': medication
                }
            }
        }
        else{
            return {
                medication: {
                    '$all': medication
                }
            }
        }
    }
}

module.exports = router;