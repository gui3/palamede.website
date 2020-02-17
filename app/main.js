require('dotenv').config()

const logger = require('./helpers/logger')

const cache = require('./helpers/cache')
cache.set('test', 'Hello Redis!')
  .then(cached => console.log('cached:' + cached))
  .catch(err => { throw err })

const app = require('./app')

console.log('App ready')
