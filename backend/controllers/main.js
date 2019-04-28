const Router = require('express-promise-router')
const router = new Router()
const { validationResult } = require('express-validator/check')
const { validateAddProduct } = require('../util/validation')
const { DatabaseError } = require('../models/Errors')

router.get('/' , async ( req , res ) => {
    res.send('connected to api')
})

router.get('/products' , async ( req , res ) => {
    try{
        const { pg } = process
        const { rows } = await pg.query('SELECT * FROM products_view')
        res.json({ statusCode : 200 , res : rows.reduce( ( a , v ) =>  ({ ...a , [v.product_id]:v }) , {} ) })

    } catch {
        res.json({ statusCode : 500 , error : DatabaseError.genDatabaseError( e ).render() } )
    }

})

router.post('/products' , validateAddProduct , async ( req , res ) => {
    const errors = validationResult( req )

    switch( errors.isEmpty() ){
        case true:
            try {
                const { pg } = process
                // store data to db
                const { productName, productImage , productPrice , productCategory , productDesc , id:creatorId } = req.body
                const q = 'INSERT INTO products( name , price , image , category , description , creator ) VALUES ( $1 , $2 , $3 , $4 , $5 , $6 )'
                await pg.query( q , [ productName , productPrice, productImage, productCategory, productDesc , creatorId ]);
                // 23505 - error
                // return a response
                res.json({ statusCode : 200 , res : { content : 'The product has been successfully added.' , state: 'positive' }})
            } catch ( e ){
                res.json({ statusCode : 500 , error : DatabaseError.genDatabaseError( e ).render() } )
            }
            break;
        default:
            //  return an errors code
            res.json({ statusCode: 400 , error : { content : errors.array()[0].msg , state : 'negative' } })
            break;
    }
})

router.get('/products/:productId' , async ( req , res ) => {
    try{
        const { productId } = req.params
        const { rows } =  await process.pg.query('SELECT * FROM products_view WHERE product_id = $1' , [ productId ])
        res.json({ statusCode : 200 , res : rows[0] })
    } catch( e ){
        console.log( e )
        res.json({ statusCode : 500 , error : DatabaseError.genDatabaseError( e ).render() } )
    }
})

router.put('/products/:productId' , validateAddProduct , async ( req , res ) => {
    const errors = validationResult( req )

    switch( errors.isEmpty() ){
        case true:
            try {
                const { pg } = process
                const { productId } = req.params
                // store data to db
                const { productName, productImage , productPrice , productCategory , productDesc , id:creatorId } = req.body
                const q = 'UPDATE products SET name=$1, price=$2, image=$3, category=$4, description=$5, creator=$6 WHERE id=$7'
                await pg.query( q , [ productName , productPrice, productImage, productCategory, productDesc , creatorId , productId ]);
                // 23505 - error
                // return a response
                res.json({ statusCode : 200 , res : { content : 'The product has been successfully updated.' , state: 'positive' }})
            } catch ( e ){
                res.json({ statusCode : 500 , error : DatabaseError.genDatabaseError( e ).render() } )
            }
            break;
        default:
            //  return an errors code
            res.json({ statusCode: 400 , error : { content : errors.array()[0].msg , state : 'negative' } })
            break;
    }
})

router.delete('/products/:productId' , async ( req, res ) => {
    try{
        const { productId } = req.params
        await process.pg.query('DELETE FROM products WHERE id = $1' , [ productId ])
        res.json({ statusCode : 200 , res : { content : 'The product has been successfully deleted.' , state: 'positive' }})
    } catch( e ){
        res.json({ statusCode : 500 , error : DatabaseError.genDatabaseError( e ).render() } )
    }
})

module.exports = router