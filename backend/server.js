const express = require('express')
      app = express(),
      port = process.env.PORT || 3001,
      mainRoutes = require('./controllers/main')

app.use('/', mainRoutes )


app.listen( port , () => {
    console.log(`The app listens on port ${ port }`)
})