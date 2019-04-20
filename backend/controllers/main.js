const Router = require('express-promise-router')
const router = new Router()

router.get('/' , async ( req , res ) => {
    res.send('connected to api')
})

router.post('/products' , async ( req , res ) => {
    const { name , price , image ,  category , description } = req.body

    
})


module.exports = router