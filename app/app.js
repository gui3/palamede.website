// Requires ---------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('serve-favicon')
// const partials = require('express-partials')
const handlebars = require('express-handlebars')

const logger = require('./utils/logger')
const routes = require('./routes/index')
const errorHandler = require('./utils/errorHandler')

// Setup ---------------------------------------------------------------------
const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// view engine ===============================================================
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/components'),
  defaultLayout: 'index',
  extname: 'hbs'
}))
// app.use(partials())

// static and favicon ========================================================
app.use(express.static('app/public'))

app.use(favicon(path.join(
  __dirname, 'public', 'favicon.ico'
)))

// ROUTES ====================================================================
app.use('/', routes)

// 404 page not found ==========================================================
const error404 = require('./utils/404')
app.use(error404)

// ERROR HANDLER =============================================================
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  logger.info('Server listening on port :' + port)
})

module.exports = app
