'use strict'

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'data/logs/app.log' })
  ]
});

// logger.level = 'debug'

module.exports = logger