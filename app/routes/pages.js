const router = require('express').Router()

const loadNews = require('../db/loadNews')

router.get('/', function (req, res) {
  res.render('pages/home', {
    news: loadNews().slice(0,4)
  })
})

router.get('/about', function (req, res) {
  res.render('pages/about')
})

router.get('/news', function (req, res) {
  res.render('pages/news', {
    news: loadNews()
  })
})

router.get('/map', function (req, res) {
  res.render('pages/map')
})

router.get('/shop', function (req, res) {
  res.render('pages/shop')
})

module.exports = router
