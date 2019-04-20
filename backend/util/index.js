const { Pool } = require('pg')

module.exports = (() => ({
    // method that initialize a connection with pg
    initPgConnection : async () => {
        const pool = await new Pool({ connectionString: process.env.URI_PG_ECOMMERCE })
        console.log('successful connection to pg...')
        return pool
    }
}))()