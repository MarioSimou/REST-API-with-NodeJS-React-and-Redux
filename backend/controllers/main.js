const Router = require('express-promise-router')
const router = new Router()

router.get('/' , async ( req , res ) => {
    res.send('connected to api')
})

router.post('/products' , async ( req , res ) => {
    console.log( req.body)
    console.log('inside products route...');
    // handle products data
    res.json({ statusCode : 200 })
})


module.exports = router