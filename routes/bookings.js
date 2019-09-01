var bookingsDAO = require('../dao/bookingsDAO');
var express = require('express');
var router = express.Router();
/**
    * @api {get} /bookings?medication[]=:medication&mode=:mode&clinic=:clinic&frametime[start]=:startframetime&frametime[end]=:endframetime&page=:page&perpage=:perpage Get bookings by ConsumedMedications
    * @apiDescription Permite listado de citas. Esta estructura exige el parámetro medication como obligatorio.
    * @apiGroup Bookings
    * @apiVersion 1.0.0
    * @apiParam {String[]} medication Medicamento - Repetir estructura por cada medicamento
    * @apiParam {String="STRICT","LAX"} [mode=STRICT] Modo de consumo de medicamento
    * @apiParam {String} [clinic] Nombre de la clinica
    * @apiParam {String} [startframetime] Fecha de inicio en formato ISO 8601
    * @apiParam {String} [endframetime] Fecha de fin en formato ISO 8601
    * @apiParam {Number} [page=1] Pagina
    * @apiParam {Number} [perpage=1000] Registro por página
    * @apiExample {curl} Example:
    *   GET /bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z
    * @apiExample {curl} Example using pagination:
    *   GET /bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z&page=10&perpage=100
    * @apiSuccess (201) {Object[]} Bookings Lista de citas
    * @apiSuccess (201) {String}    Booking.name Nombre completo del cliente
    * @apiSuccess (201) {String}    Booking.email  Email del cliente
    * @apiSuccess (201) {String}    Booking.datetime Fecha de inicio
    * @apiSuccess (201) {String}    Booking.clinicName Nombre de la clinica
    * @apiSuccess (201) {String[]}  Booking.medication Lista de medicamentos consumidos
    * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     headers [
 *          eva-total:22,
 *          eva-pages: 1,
 *          eva-page: 1
 *     ]
 *     body [
 *       {
 *          "id": 3210,
 *          "name": "Curtis Alexander",
 *          "email": "curtis_alexander@gmail.com",
 *          "datetime": "2019-11-27T21:22:41.553Z",
 *          "clinicName": "EXPLANADA",
 *          "medication": [
                        "BLOOD_THINNERS",
                        "COAGULANTS",
                        "HORMONE_THERAPY",
                        "ANTIBIOTICS",
                        "VITAMINS"
                    ]
 *        }
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
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page, perpage);
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page, perpage);
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, match, req.query.page, perpage);
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications, null, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookingsByConsumedMedications(matchMedications);

    res.append('eva-total', response.total);
    res.append('eva-pages', response.totalpages);
    res.append('eva-page', response.page);
    res.status(201).json(response.bookings);
})
/**
    * @api {get} /bookings?mode=:mode&clinic=:clinic&frametime[start]=:startframetime&frametime[end]=:endframetime&page=:page&perpage=:perpage Get all bookings
    * @apiDescription Permite listado de citas. Esta estructura no exige ningún parámetro como obligatorio.
    * @apiGroup Bookings
    * @apiVersion 1.0.0
    * @apiParam {String="STRICT","LAX"} [mode=STRICT] Modo de consumo de medicamento
    * @apiParam {String} [clinic] Nombre de la clinica
    * @apiParam {String} [startframetime] Fecha de inicio en formato ISO 8601
    * @apiParam {String} [endframetime] Fecha de fin en formato ISO 8601
    * @apiParam {Number} [page=1] Pagina
    * @apiParam {Number} [perpage=1000] Registro por página
    * @apiExample {curl} Example:
    *   GET /bookings?mode=LAX&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z
    * @apiExample {curl} Example using pagination:
    *   GET /bookings?mode=LAX&clinic=EXPLANADA&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z&page=10&perpage=2000
    * @apiSuccess (201) {Object[]} Bookings Lista de citas
    * @apiSuccess (201) {String}    Booking.name Nombre completo del cliente
    * @apiSuccess (201) {String}    Booking.email  Email del cliente
    * @apiSuccess (201) {String}    Booking.datetime Fecha de inicio
    * @apiSuccess (201) {String}    Booking.clinicName Nombre de la clinica
    * @apiSuccess (201) {String[]}  Booking.medication Lista de medicamentos consumidos
    * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     headers [
 *          eva-total:372,
 *          eva-pages: 1,
 *          eva-page: 1
 *     ]
 *     body [
 *       {
 *          "id": 734,
 *          "name": "Pauline Alexander",
 *          "email": "pauline_alexander@gmail.com",
 *          "datetime": "2019-11-27T15:56:30.283Z",
 *          "clinicName": "EXPLANADA",
 *          "medication":[
 *                      "VITAMINS",
 *                      "BLOOD_THINNERS",
 *                      "ANTIBIOTICS"
 *                  ]
 *        }
 *     ]
    */
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
        response = await bookingsDAO.getBookings(match, req.query.page, perpage);
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(match, req.query.page, perpage);
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

    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(match, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(match);

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
        response = await bookingsDAO.getBookings(null, req.query.page, perpage);
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