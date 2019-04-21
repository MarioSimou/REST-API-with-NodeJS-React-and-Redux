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
                // 23505 - error
                // return a response
                res.json({ statusCode : 200 , res : { content : 'The product has been successfully added.' , state: 'positive' }})
            } catch ( e ){
                let msg;
                console.log( e )
                // analyse errors
                switch( +e.code ){
                    case 23505:
                        msg = `Duplcicate product ${ e.constraint.match(/(?<=unique_products_)(.*)/g)[0] }`    
                        break;
                    default:
                        msg = `${ e.detail }`
                }
                res.json({ statusCode : 500 , error : new DatabaseError( msg ).render() } )

            }
            break;
        default:
            //  return an errors code
            res.json({ statusCode: 400 , error : { content : errors.array()[0].msg , state : 'negative' } })
            break;
    }
})


module.exports = router