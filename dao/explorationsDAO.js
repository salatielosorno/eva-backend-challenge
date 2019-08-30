let explorations;

module.exports = class explorationsDAO {
    static async setDB(conn) {
        if(explorations)
            return;

        try {
            explorations = await conn.db(process.env.EVA_DB).collection("explorations");
        } catch (error) {
            console.error(`No se pudo establecer la coleccion explorations: ${error}`)
        }
    }

    static async getExplorations() {
        try {
            let cursor = await explorations.find();
            let total = await explorations.countDocuments();

            const explorationsResult = await cursor.toArray();
            const totalNumExplorations = total;

            return { explorations: explorationsResult, total: totalNumExplorations }   
        } catch (error) {
            console.error(`Ocurrio un problema al recuperar datos: ${error}`);
            return { explorations: [], total: 0 }
        }
    }
}