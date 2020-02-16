const loadncache = require('loadncache')
const mcache = require('memory-cache')
const db = require('db')


// Imagine you have a function that gets data
function getdata () {
  return "some data"
}

// Now this function you want to cache the result
// This is where loadncache comes

const dataloader = new loadncache.Loader(getdata)

const data = dataloader.getReturn() // here getdata is executed

const data2 = dataloader.getReturn() // here you get only the cached data from the previous execution

// Ok this was not interesting
// But what if your function is asynchronous,
// takes a lot of time or is a limited API request ?

function fetchGithubInfo(user) {
  const url = 'https://api.github.com/users/'+ user

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(xhr.response)
    }
    xhr.send()
  })
}

// Now you really don't want this request to be send every minutes
// but only once an hour
const githubLoader = new loadncache.Loader(
  getGithubInfo,
  60 * 60 * 1000 // ttl = 1 hour
)

// getGithubInfo('gui3') -> your line of code before loadncache
githubLoader.getPromise('gui3')
  .then(datum => {
    console.log(datum)
  }) // makes the request

githubLoader.getPromise('gui3')
  .then(datum => {
    console.log(datum)
  }) // resolves instantly the cached result

// indeed, when the first request returns a Promise,
// the Loader.get method will remember it
// and wrap future cached results around an immediate promise

// now if you want to use callbacks, you can too,
// but it's a bit more intense










const dataloader = new loadncache.SmartCache()

dataloader.set(
  'github info',
  function loadGithubInfo (cache, options) {
    const username = options.args
    fetch('https://api.github.com/users/' + userName)
      .then(function (err, data) {
        if (err) throw err
        else cache(
          'githubInfo:' + userName,
          data,
          10000
        ) // key, value, ttl (expire time)
      })
    // you can use async function by calling the cache callback,
    // or return a promise and resolve your data
    // or just return your data if sync
  }
)

dataloader.get('github info', {name:'gui3'})
// will perform the request to github
// give back the data



// more options :
const dataloader2 = loadncache.CacheLoader(
  function getData (options) {
    const data = db.get(options)
    return data
  },
  { // options? -> if no getter/setter is set, a memory cache is used
    cacheSetter: function (key, data, ttl) {
      mcache.set(key, data, ttl)
    },
    // define a cache setter function with custom logic
    cacheGetter: mcache.get
    // or pass a function if it fits the right requirements :
    // cacheSetter(key)
    // returns
  }
)

dataloader2.test({
  samples: [
    'some',
    { testing: 'data' },
    ['that', 'matches', 'future', 'use']
  ],
  ttl: 1000
}) // !IMPORTANT
// will test if cacheSetter and cacheGetter work properly
// by setting then getting multiple bogus data
// {key: "__loadncachetest__", value:<each samples>}
// -- if your setter does not support overwriting,
//    you can pass only 1 sample
