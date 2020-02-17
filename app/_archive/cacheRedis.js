const redis = require('redis')

const cache = redis.createClient({
  // url: '[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]'
})

function get (key) {
  return new Promise((resolve, reject) => {
    cache.get(key, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function set (key, value, ttl = 0) {
  return new Promise((resolve, reject) => {
    cache.set(key, value, ttl, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  set
}
