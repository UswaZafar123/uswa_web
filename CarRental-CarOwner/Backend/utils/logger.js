// utils/logger.js
const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      level: 'info',
      db: process.env.MONGO_URI,
      collection: 'audit_logs',
      options: { useUnifiedTopology: true },
    }),
  ],
});

module.exports = logger;
