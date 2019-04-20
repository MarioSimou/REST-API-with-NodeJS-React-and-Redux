const { body }  = require('express-validator/check')
const u = require('../index')
const isEmpty = v => {
    if( u.hasValue( v )) return true
    else throw new Error()
}

module.exports = (() => ({
    // validate add product
    validateAddProduct : [
        body('productName')
            .custom( isEmpty)
            .withMessage('Fill the value to proceed.'),
        body('productPrice')
            .custom( isEmpty)
            .withMessage('Fill the value to proceed.'),
        body('productImage')
            .custom( isEmpty)
            .withMessage('Fill the value to proceed.')
            .isURL({ protocols : ['http' , 'https' ]})
            .withMessage('Invalid image url.'),
        body('productCategory')
            .custom( isEmpty)
            .withMessage('Fill the value to proceed.'),
        body( 'productDesc')
            .custom( isEmpty)
            .withMessage('Fill the value to proceed.')
    ]
}))()