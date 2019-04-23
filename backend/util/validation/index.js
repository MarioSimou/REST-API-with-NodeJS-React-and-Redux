const { body }  = require('express-validator/check')
const u = require('../index')
const { compare } = require('bcryptjs')

// IIFE that contains the custom validation methods
const n = (()=>({
    isEmpty : v => {
        if( u.hasValue( v )) return true
        else throw new Error()
    },
    comparePassword : ( v , { req } ) => {
        const { password , confPassword } = req.body
        if (  password === confPassword ) return true
        else throw new Error()
    },
    validateEmail : async ( email , { req }) => {
        const q = 'SELECT id,email,password FROM users WHERE email = $1'
        const { rows } = await process.pg.query( q , [ email ] )
        const [ user ] = rows
        if( user ){
            req.user = user
            return true
        }else throw new Error()
    },
    validatePassword : async ( password , { req }) => {
        const user = req.user
        const isValid = await compare( password , user.password )
        if( isValid ) return true
        else throw new Error()
    }
}))()

module.exports = (() => ({
    // validate add product
    validateAddProduct : [
        body('productName')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed.'),
        body('productPrice')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed.'),
        body('productImage')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed.')
            .isURL({ protocols : ['http' , 'https' ]})
            .withMessage('Invalid image url.'),
        body('productCategory')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed.'),
        body( 'productDesc')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed.')
    ],
    validateRegistration : [
        body('username')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed'),
        body('email')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed')
            .isEmail()
            .withMessage('Invalid email address.'),
        body('password')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 characters')
            .custom( n.comparePassword )
            .withMessage('Passwords do not match'),
        body('confPassword')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 characters')
            .custom( n.comparePassword )
            .withMessage('Passwords do not match'),
    ],
    validateLogin : [
        body('email')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed')
            .isEmail()
            .withMessage('Invalid email address.')
            .custom( n.validateEmail )
            .withMessage('A user with that email address does not exist'),
        body('password')
            .custom( n.isEmpty)
            .withMessage('Fill the value to proceed')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 characters')
            .custom( n.validatePassword)
            .withMessage('Invalid password.')
    ]
}))()