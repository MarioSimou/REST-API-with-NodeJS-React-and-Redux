const Router = require('express-promise-router')
const router = new Router()
const { validationResult } = require('express-validator/check')
const { validateAddProduct } = require('../util/validation')

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
                console.log( e.detail )
                // analyse errors
                res.json({ statusCode : 500 , errors : { content: 'Uncaught 500 error' , state : 'negative'} })
                // res.json({ statusCode : 500 , errors : { message : e.detail } })
            }
            break;
        default:
            //  return an errors code
            res.json({ statusCode: 400 , errors : { content : errors.array()[0].msg , state : 'negative' } })
            break;
    }
})


module.exports = router