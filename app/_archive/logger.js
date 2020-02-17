/*
* the logger
*/

const intel = require('intel')

intel.config({
  formatters: {
    simple: {
      format: '[%(levelname)s] %(message)s',
      colorize: true
    },
    details: {
      format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
      strip: true
    }
  },
  // filters: {
  //   db: 'main.db'
  // },
  handlers: {
    terminal: {
      class: intel.handlers.Console,
      formatter: 'simple',
      level: intel[process.env.LOG_LEVEL_T || 'TRACE']
    },
    logfile: {
      class: intel.handlers.File,
      level: intel[process.env.LOG_LEVEL_F || 'WARNING'],
      file: './log/report.log',
      formatter: 'details'// ,
      // filters: ['db']
    }
  },
  loggers: {
    main: {
      handlers: ['terminal', 'logfile'],
      // level: intel[process.env.LOG_LEVEL_T.toUpperCase()],
      handleExceptions: true,
      exitOnError: false,
      propagate: false
    },
    'main.logfile': {
      handlers: ['logfile']// ,
      // level: intel[process.env.LOG_LEVEL_F.toUpperCase()]
    }
  }
})

const logger = intel.getLogger('main')

console.log('--->logger ready')

module.exports = logger
