const { createLogger, format, transports } = require('winston');

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
	exitOnError: false,
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new transports.Console(),
		new transports.File({ filename: './logs/error.log', level: 'error' }),
		new transports.File({ filename: './logs/info.log', level: 'info' }),
	],
});

module.exports = logger;
