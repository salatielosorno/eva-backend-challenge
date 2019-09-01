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
        perpages = 1000
    ) {
        try {

            let skip = page == 1 ? 0 : (page - 1) * perpages;

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
                            '$limit': perpages
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
            let total = bookingsResult.totales[0].totalRegisters;

            const totalRegisters = total;
            const totalpages = totalRegisters % perpages > 1 ? Math.floor(totalRegisters / perpages) + 1 : totalRegisters / perpages;

            return { bookings: bookingsResult.explorationsPerPage, total: totalRegisters, page: page, totalpages: totalpages }
        } catch (error) {
            console.error(`Ocurrio un problema al recuperar datos: ${error}`);
            return { bookings: [], total: 0, page: 0, totalpages: 0 }
        }
    }
}