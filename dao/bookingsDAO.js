let bookings;
//Total de registros por pagina - Default 1000

module.exports = class bookingsDAO {
    static async setDB(conn) {
        if (bookings)
            return;

        try {
            bookings = await conn.db(process.env.EVA_DB).collection("bookings");
        } catch (error) {
            console.error(`No se pudo establecer la coleccion bookings: ${error}`)
        }
    }

    static async getBookings(
        filters = null,
        page = 1,
        perpage = 1000
    ) {
        try {

            let skip = Math.floor(page) == 1 ? 0 : (Math.floor(page) - 1) * Math.floor(perpage);
            let limit = Math.floor(perpage) * 1;

            const match = {
                $match: filters
            }
            const lookup = {
                '$lookup': {
                    'from': 'explorations',
                    'localField': 'id',
                    'foreignField': 'bookingId',
                    'as': 'bookings'
                }
            }
            const addFieds = {
                '$addFields': {
                    'bookings': '$bookings.consumedMedications'
                }
            }
            const unwind = {
                '$unwind': {
                    'path': '$bookings'
                }
            }
            const facet = {
                '$facet': {
                    'totales': [
                        {
                            '$count': 'totalRegisters'
                        }
                    ],
                    'explorationsPerPage': [
                        {
                            '$skip': skip
                        }, {
                            '$limit': limit
                        }
                    ]
                }
            }

            let pipeline;
            if (filters)
                pipeline = [
                    match,
                    lookup,
                    addFieds,
                    unwind,
                    facet
                ]
            else
                pipeline = [
                    lookup,
                    addFieds,
                    unwind,
                    facet
                ]

            const bookingsResult = await (await bookings.aggregate(pipeline)).next();

            let total = 0;

            if(bookingsResult.totales){
                if(bookingsResult.totales[0])
                {
                    total = bookingsResult.totales[0].totalRegisters;
                }
            }

            const totalRegisters = total == 0 ? 1 : total;

            let totalPaginas;

            if(totalRegisters == 1 || totalRegisters <= perpage)
                totalPaginas = 1;
            else
                totalPaginas = totalRegisters % perpage > 1 ? Math.floor(totalRegisters / perpage) + 1 : totalRegisters / perpage;

            const totalpages = totalPaginas;

            return { bookings: bookingsResult.explorationsPerPage, total: totalRegisters, page: page, totalpages: totalpages }
        } catch (error) {
            console.error(`Ocurrio un problema al recuperar datos: ${error}`);
            return { bookings: [], total: 0, page: 0, totalpages: 0 }
        }
    }

    static async getBookingsByConsumedMedications(
        medications = null,
        filters = null,
        page = 1,
        perpage = 1000
    ) {
        try {

            let skip = Math.floor(page) == 1 ? 0 : (Math.floor(page) - 1) * Math.floor(perpage);
            let limit = Math.floor(perpage) * 1;

            const match = {
                $match: filters
            }
            const lookup = {
                '$lookup': {
                    'from': 'explorations', 
                    'localField': 'id', 
                    'foreignField': 'bookingId', 
                    'as': 'medication'
                }
            }
            const addFieds = {
                '$addFields': {
                    'medication': '$medication.consumedMedications'
                }
            }
            const unwind = {
                '$unwind': {
                    'path': '$medication'
                }
            }
            const medicationsConsumed = {
                $match: medications
            }
            const facet = {
                '$facet': {
                    'totales': [
                        {
                            '$count': 'totalRegisters'
                        }
                    ],
                    'explorationsPerPage': [
                        {
                            '$skip': skip
                        }, {
                            '$limit': limit
                        }
                    ]
                }
            }

            let pipeline;
            if (filters && medications)
                pipeline = [
                    match,
                    lookup,
                    addFieds,
                    unwind,
                    medicationsConsumed,
                    facet
                ];
        
            else   
                pipeline = [
                    lookup,
                    addFieds,
                    unwind,
                    medicationsConsumed,
                    facet
                ];
            const bookingsResult = await (await bookings.aggregate(pipeline)).next();

            let total = 0;

            if(bookingsResult.totales){
                if(bookingsResult.totales[0])
                {
                    total = bookingsResult.totales[0].totalRegisters;
                }
            }

            const totalRegisters = total == 0 ? 1 : total;

            let totalPaginas;

            if(totalRegisters == 1 || totalRegisters <= perpage)
                totalPaginas = 1;
            else
                totalPaginas = totalRegisters % perpage > 1 ? Math.floor(totalRegisters / perpage) + 1 : totalRegisters / perpage;

            const totalpages = totalPaginas;

            return { bookings: bookingsResult.explorationsPerPage, total: totalRegisters, page: page, totalpages: totalpages }
        } catch (error) {
            console.error(`Ocurrio un problema al recuperar datos: ${error}`);
            return { bookings: [], total: 0, page: 0, totalpages: 0 }
        }
    }
}