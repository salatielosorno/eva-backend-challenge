var bookingsDAO = require('../dao/bookingsDAO');
var express = require('express');
var router = express.Router();
/**
    * @api {get} /bookings?medication[]=:medication&mode=:mode&clinic=:clinic&frametime[start]=:startframetime&frametime[end]=:endframetime&page=:page&perpage=:perpage Get bookings
    * @apiDescription Permite listado de citas. Esta estructura no exige ningún parámetro como obligatorio.
    * @apiGroup Bookings
    * @apiVersion 1.0.0
    * @apiParam {String[]} [medication] Medicamento - Repetir estructura por cada medicamento
    * @apiParam {String="STRICT","LAX"} [mode=STRICT] Modo de consumo de medicamento
    * @apiParam {String} [clinic] Nombre de la clinica
    * @apiParam {String} [startframetime] Fecha de inicio en formato ISO 8601
    * @apiParam {String} [endframetime] Fecha de fin en formato ISO 8601
    * @apiParam {Number} [page=1] Página
    * @apiParam {Number} [perpage=1000] Registros por página
    * @apiExample {curl} Example:
    *   GET /bookings?mode=LAX&clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS
    * @apiExample {curl} Example using pagination:
    *   GET /bookings?mode=LAX&clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&page=10&perpage=500
    * @apiSuccess (201) {Object[]} Bookings Lista de citas
    * @apiSuccess (201) {String}    Booking.name Nombre completo del cliente
    * @apiSuccess (201) {String}    Booking.email  Email del cliente
    * @apiSuccess (201) {String}    Booking.datetime Fecha de inicio
    * @apiSuccess (201) {String}    Booking.clinicName Nombre de la clinica
    * @apiSuccess (201) {String[]}  Booking.medication Lista de medicamentos consumidos
    * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     headers 
 *          eva-total:11199,
 *          eva-pages: 23,
 *          eva-page: 10
 *     body [
 *         {
 *             "id": 3210,
 *             "name": "Curtis Alexander",
 *             "email": "curtis_alexander@gmail.com",
 *             "datetime": "2019-11-27T21:22:41.553Z",
 *             "clinicName": "EXPLANADA",
 *             "medication": [
                       "BLOOD_THINNERS",
                       "COAGULANTS",
                       "HORMONE_THERAPY",
                       "ANTIBIOTICS",
                       "VITAMINS"
               ]
 *         },
 *         {
 *             .
 *             .
 *             .
 *         }
 *     ]
    */
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(matchMedications, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(matchMedications, match);

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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(matchMedications, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(matchMedications, match);

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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(matchMedications, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(matchMedications, match);

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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(matchMedications, null, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(matchMedications);

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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(null, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(null, match);
    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {
    let match = null;
    if (!req.query.clinic) return next('route')

    match = { clinicName: req.query.clinic };

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(null, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(null, match);

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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(null, match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(null, match);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);

    res.status(201).json(response.bookings);
})
router.get('/', async function (req, res, next) {

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(null, null, req.query.page, perpage);
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