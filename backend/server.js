const express = require('express')
      app = express(),
      port = process.env.PORT || 3001,
      mainRoutes = require('./controllers/main'),
      { initPgConnection } = require('./util'),
      bodyParser = require('body-parser')

// Content-Type: application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended  : true })) // true -> qs
// Content-Type: application/json
app.use( bodyParser.json() )

app.use( ( req , res , next ) => {
    // console.log('inside middleware')
    // req.header('Access-Control-Allow-Origin' , '*' );
    next()
})

app.use('/', mainRoutes )


app.listen( port , async () => {
    console.log(`The app listens on port ${ port }`)
    // initialize a connection to pg
    process.pg = initPgConnection()
})