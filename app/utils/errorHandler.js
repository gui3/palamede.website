const logger = require('./logger')

function textErrorPage (handlerError, originalError, res) {
  // in case there is NO RENDERER
  // this is my last resooort ...
  res.status(500)
    .type('text')
    .send(
      '\n\n' +
      '**************************************\n' +
      'OUPS ???? j ai cru voir une grosse erreur ...\n' +
      'Si vous voyez ce message, ' +
      'merci de prevenir le webmaster a cette addresse :\n' +
      'guillaume.silvent@hotmail.fr\n' +
        '**************************************\n\n' +
      'ERROR HANDLING AN ERROR --------------------\n\n' +
      handlerError.stack +
      '\n\nORIGINAL ERROR -----------------------------\n\n' +
      originalError.stack
    )
}

module.exports = function (err, req, res, next) {
  if (err.code !== 'VOLUNTARY') {
    logger.error(err.stack)
  }

  try { // rendered error page -----------------------------------------------
    res.status(500)
    res.render(
      'ERROR',
      {
        err: err,
        layout: 'bare',
        page: {
          scripts: [
            // './js/shared/askServer.js'
          ]
        }
      },
      function (e, html) {
        if (e) { // renderer not working 1 -----------------------------------
          textErrorPage(e, err, res)
        } else { // renderer working -----------------------------------------
          res.send(html)
        }
      }
    )
  } catch (e) { // renderer not working 2 ------------------------------------
    textErrorPage(e, err, res)
  }
}
