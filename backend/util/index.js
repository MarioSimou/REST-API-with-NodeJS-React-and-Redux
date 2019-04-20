const { Pool } = require('pg')

module.exports = (() => ({
    initPgConnection : async () => {
        const pool = await new Pool({ connectionString: process.env.URI_PG_ECOMMERCE })
        console.log('successful connection to pg...')
        return pool
    }

}))()