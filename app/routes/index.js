const router = require('express').Router()

const logger = require('../utils/logger')
// const autoRouter = require('./modules/autoRouter')

// const root = 'home' // set here the page to launch at address '/'

router.use(function timeLog (req, res, next) {
  console.log('' + Date.now() + '-Request:' + req.url + '-Method:' + req.method)
  next()
})

router.use(require('./pages'))

// subdomains ===================================================
/*
const usersRoutes = require('./users')
router.use('/users', usersRoutes)
*/

// voluntary error ==============================================
router.get('/error', function (req, res) {
  const err = new Error('YOU WANT TO SEE AN ERROR ? HERE IT IS')
  err.code = 'VOLUNTARY'
  throw err
})

logger.info('--> all pages ready')

module.exports = router
