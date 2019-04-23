const Router = require('express-promise-router'),
      router = new Router(),
      { validationResult } = require('express-validator/check'),
      { ValidationError , DatabaseError } = require('../models/Errors'),
      { validateRegistration , validateLogin } = require('../util/validation'),
      { hash } = require('bcryptjs'),
      jwt = require('jsonwebtoken')

router.post('/register' ,  validateRegistration , async ( req , res ) => {
    const errors = validationResult( req )
    
    switch( errors.isEmpty() ){
        case true:
            try{
                let { username , email , password } = req.body
                const { pg } = process
                const q = 'INSERT INTO users( username , email , password ) VALUES( $1 , $2 , $3)'
                const s = 'SELECT id FROM users WHERE email = $1'
                const c = 'INSERT INTO carts( userid ) VALUES ( $1)'
                // hashes password
                password = await hash( password , 12  )
                // stores the user to the database
                await pg.query( q , [ username , email , password ])
                // retrieves the user from the database
                const { rows } = await pg.query( s  , [ email ] )
                // creates a cart to the user
                await pg.query( c , [ rows[0].id ] )
                // signs a jwt and returns it
                const token = await jwt.sign( { id : rows[0].id , exp : Math.floor(Date.now() / 1000) + (60 * 60) } , process.env.JWT_PRIVATE_KEY ) 
                // returned json
                res.json({ statusCode : 200 , res : { content : `Welcome to our site`  , state : 'positive' } , token })
            } catch ( e ){
                // return a validation error
                res.json({ statusCode : 400 , error : DatabaseError.genDatabaseError( e ).render() } )
            }
            break;
        default:
            // return a validation error
            res.json({ statusCode : 400 , error : new ValidationError( errors.array()[0].msg ).render() } )

    }
})

router.post('/login' , validateLogin , async ( req , res ) => {
    const errors = validationResult( req )

    switch( errors.isEmpty() ){
        case true:
            try{
                const { user } = req
                const token = await jwt.sign( { id : user.id , exp : Math.floor(Date.now() / 1000) + (60 * 60) } , process.env.JWT_PRIVATE_KEY )

                res.json({ statusCode : 200 , res : { content : `Welcome to our site`  , state : 'positive' } , token })
            }catch( e ){
                res.json({ statusCode : 400 , error : DatabaseError.genDatabaseError( e ).render() } )
            }
            break;
        default:
            res.json({ statusCode : 400 , error : new ValidationError( errors.array()[0].msg).render() })
            break;
    }
})

module.exports = router