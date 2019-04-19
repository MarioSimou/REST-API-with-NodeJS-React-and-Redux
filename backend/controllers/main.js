const Router = require('express-promise-router')
const router = new Router()

router.get('/' , async ( req , res ) => {
    res.send('connected to api')
})


module.exports = router