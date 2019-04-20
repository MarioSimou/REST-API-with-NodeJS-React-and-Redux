const express = require('express')
      app = express(),
      port = process.env.PORT || 3001,
      mainRoutes = require('./controllers/main'),
      { initPgConnection } = require('./util')

app.use('/', mainRoutes )

app.listen( port , async () => {
    console.log(`The app listens on port ${ port }`)
    // initialize a connection to pg
    process.pg = initPgConnection()
})