const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// const MongoStore = require('connect-mongo')(session)

const app = express()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//MAP GLOBAL PROMISE - get rid of warning when you run the server
mongoose.Promise = global.Promise

//DB config
const db = require('./config/database')

// //CONNECT TO MONGOOSE
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    autoReconnect: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

//to destroy session when inactive use these (resave: true, rolling: true, expires: 30 * 1000[30seconds])
//Express Session
// app.use(
//   session({
//     secret: "some Bank authentication",
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: {
//       // maxAge: Date.now() + 60 * 60 * 12 * 1000
//       expires: Date.now() + 60 * 60 * 1000
//     }
//   })
// );

//setting up the templates
app.set('view engine', 'pug')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))

//Use routes
app.use(require('./routes/route.js'))

//404 handler
app.use((req, res, next) => {
  const error = new Error('Page not found!!!!')
  error.status = 404
  return next(error)
})

//main error handler
app.use((error, req, res, next) => {
  return res.status(error.status || 500).render('error', { error })
})

const port = process.env.PORT || 2000

app.listen(port, () => console.log(`Server running on port ${port}`))
