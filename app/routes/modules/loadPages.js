const fs = require('fs')
const path = require('path')

const logger = require('../../utils/logger')

// automated page loading
module.exports = function loadPages (folder, extension) {
  return new Promise((resolve, reject) => {
    /*
     * creates a page for each .ejs found in the app/views/pages folder
     * and adds options if an optionnale .json file of the same name found
    */
    fs.readdir(
      folder,
      (err, files) => {
        err ? reject(err) : resolve(files)
      }
    )
  })
    .then(files => { // file parsing ===========================================
      const pageLoaders = []
      const fileRegex = new RegExp(extension + '$')
      files.forEach(file => {
        const fileName = file.replace(fileRegex, '')
        if (!fileName.includes('.')) { // exclude other files
          pageLoaders.push(new Promise((resolve, reject) => {
            const page = {}
            page.name = file.replace(/.ejs$/, '')
            // options.json ----------------------------------------------------
            fs.readFile(
              path.join(folder, page.name + '.json'),
              (err, data) => {
                if (!err) {
                  page.options = JSON.parse(data)
                  console.log(page.name + ' - options loaded')
                  resolve(page)
                } else if (err && err.code === 'ENOENT') {
                  console.log(
                    page.name + ' - .json not found - no options for this page'
                  )
                  page.options = {}
                  resolve(page)
                } else { // error handler
                  reject(err)
                }
              }
            )
          }))
        }
      })
      return Promise.all(pageLoaders)
    })
    .catch(err => logger.error(err))
}
