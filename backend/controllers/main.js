const Router = require('express-promise-router')
const router = new Router()
const { validationResult } = require('express-validator/check')
const { validateAddProduct } = require('../util/validation')
const { DatabaseError } = require('../models/Errors')

router.get('/' , async ( req , res ) => {
    res.send('connected to api')
})

router.post('/products' , validateAddProduct , async ( req , res ) => {
    const errors = validationResult( req )

    switch( errors.isEmpty() ){
        case true:
            try {
                const { pg } = process
                // store data to db
                const q = 'INSERT INTO products( name , price , image , category , description ) VALUES ( $1 , $2 , $3 , $4 , $5 )'
                await pg.query( q , Object.values(req.body));

                // return a response
                res.json({ statusCode : 200 , res : { content : 'The product has been successfully added.' , state: 'positive' }})
            } catch ( e ){
                const error = new DatabaseError( e.detail )
                // analyse errors
                res.json({ statusCode : 500 , error : error.render() } )
                // res.json({ statusCode : 500 , errors : { message : e.detail } })
            }
            break;
        default:
            //  return an errors code
            res.json({ statusCode: 400 , error : { content : errors.array()[0].msg , state : 'negative' } })
            break;
    }
})


module.exports = router