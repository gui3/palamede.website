const path = require('path')

const logger = require('../../utils/logger')
const loadPages = require('./loadPages')

module.exports = function autoRouter (
  router,
  viewsPath,
  pagesFolder,
  extension,
  root) {
  return loadPages(path.join(viewsPath, pagesFolder), extension)
    .then(pages => {
      // http responses ========================================================
      pages.forEach(page => {
        console.log(page.name + ' --> page loaded')
        router.get('/' + page.name, function (req, res) {
          const options = {
            shared: { // shared options for all the pages-----------------------
              pages: pages
            },
            page: page.options // page options ---------------------------------
          }
          res.render(path.join(pagesFolder, page.name), options)
        })
      })
      return pages
    })
    .then(pages => {
      // root ==================================================================
      if (root) {
        const rootPage = pages.filter(page => page.name === root)[0]
        const options = {
          shared: {
            pages: pages
          },
          page: rootPage.options
        }
        router.get('/', function (req, res) {
          res.render(path.join(pagesFolder, rootPage.name), options)
        })
        console.log('ROOT page set to -> ' + rootPage.name)
      }
      return router
    })
    .catch(err => logger.error(err))
}
