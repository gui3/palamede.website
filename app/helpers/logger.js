const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.json()
    })
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger
