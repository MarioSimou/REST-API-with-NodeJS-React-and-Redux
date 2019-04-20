const { Pool } = require('pg')

// const connect = async () => {
//     const pool = await new Pool({ connectionString: 'postgresql://admin:admin@localhost:5432/ecommerce' })
//     const { rows } = await pool.query('SELECT NOW()');
//     console.log(rows )
// }

const pool = new Pool({ connectionString: 'postgresql://admin:admin@localhost:5432/ecommerce' })

pool.query('SELECT NOW()' , (e , res ) => {
    if(!e){
        console.log(res.rows)
    }
})

// connect()