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
    let filters = {}
    let medication = {}

    if(req.query.clinic)
        filters.clinicName = req.query.clinic
    if(req.query.frametime)
        if(!req.query.frametime.start || !req.query.frametime.end)
            return res.status(400).json({ message: "Petición mal formada." })
        else
            filters.datetime = {
                '$gte': req.query.frametime.start,
                '$lt': req.query.frametime.end
            }
    
    if(req.query.mode)
        if(req.query.mode != "LAX" && req.query.mode != "STRICT")
            return res.status(400).json({ message: "Petición mal formada." })
    
    if(req.query.medication)
        medication = getMedicationConsumed(req.query.mode, req.query.medication);
    
    if(Object.keys(filters).length === 0 && filters.constructor === Object)
        req.filters = null;
    else
        req.filters = filters;
    
    if(Object.keys(medication).length === 0 && medication.constructor === Object)
        req.medication = null;
    else
        req.medication = medication;

    next();
})
router.get('/', async function (req, res, next) {
    let perpage = 1000;

    if(req.query.perpage)
        perpage = req.query.perpage;

    let response;

    if (req.query.page)
        response = await bookingsDAO.getBookings(req.medication, req.filters, req.query.page, perpage);
    else
        response = await bookingsDAO.getBookings(req.medication, req.filters);

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