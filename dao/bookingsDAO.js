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

    static async getBookings(page = 1, perpages = 1000) {
        try {

            let skip = page == 1 ? 0 : page * perpages;

            const pipeline = [
                {
                    '$lookup': {
                        'from': 'explorations',
                        'localField': 'id',
                        'foreignField': 'bookingId',
                        'as': 'bookings'
                    }
                }, {
                    '$addFields': {
                        'bookings': '$bookings.consumedMedications'
                    }
                }, {
                    '$unwind': {
                        'path': '$bookings'
                    }
                }, {
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
            ]

            const bookingsResult = await (await bookings.aggregate(pipeline)).next();
            let total = await bookings.countDocuments();

            const totalRegisters = total;
            const totalpages = totalRegisters / perpages;

            //console.log(await bookingsResult)

            return { bookings: bookingsResult.explorationsPerPage, total: totalRegisters, page: page, totalpages: totalpages }
        } catch (error) {
            console.error(`Ocurrio un problema al recuperar datos: ${error}`);
            return { bookings: [], total: 0, page: 0, totalpages: 0 }
        }
    }
}