const logger = require('./winston');

function logApolloResponseBody(req, res, next) {
	/**
	 ******* LOG REQUEST *******
	 */
	logger.info({
		ipAddress: req.headers['x-forwarded-for'],
		query: req.body.query,
		token: req.headers['authentification'],
		type: 'Request',
		url: req.originalUrl,
		variables: req.body.variables,
	});

	/**
	 ******* LOG RESPONSE *******
	 */

	const oldWrite = res.write,
		oldEnd = res.end;

	const chunks = [];

	res.write = function(chunk) {
		chunks.push(new Buffer.from(chunk));

		oldWrite.apply(res, arguments);
	};

	res.end = function(chunk) {
		if (chunk) {
			chunks.push(new Buffer.from(chunk));
		}

		const body = Buffer.concat(chunks).toString('utf8');

		const parsedBody = JSON.parse(body);

		if (parsedBody.errors && parsedBody.errors.length) {
			logger.error({
				error: parsedBody,
				ipAddress: req.headers['x-forwarded-for'],
				type: 'Response GQL Error',
			});
		} else {
			// console.log('response', req.originalUrl, body);
			logger.info({
				ipAddress: req.headers['x-forwarded-for'],
				response: body,
				type: 'Response',
				url: req.originalUrl,
			});
		}

		oldEnd.apply(res, arguments);
	};

	next();
}

function setupGlobalErrorsLogs() {
	process.on('uncaughtException', function(err) {
		logger.error(
			{
				error: err.message,
				stack: err.stack,
				type: 'uncaughtException',
			},
			() => {
				// https://nodejs.org/api/process.html#process_process_exit_code
				process.exitCode = 1;
			},
		);
	});

	process.on('unhandledRejection', (reason, promise) => {
		// I just caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below), let throw and let him handle that

		logger.error(
			{
				promise,
				reason,
				type: 'unhandledRejection',
			},
			() => {
				throw reason;
			},
		);
	});
}

function logMiddlewareErrors(err, req, res, next) {
	logger.error({
		error: err,
		type: 'middleware_errors',
	});
	next(err);
}

function logRateLimit(req, res, options) {
	/* empty */
	logger.error({ ipAddress: req.headers['x-forwarded-for'], msg: options.message, type: 'rate_limit' });
}

module.exports = { logApolloResponseBody, logMiddlewareErrors, logRateLimit, setupGlobalErrorsLogs };
