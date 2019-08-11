require('dotenv').config();

const {
	logApolloResponseBody,
	setupGlobalErrorsLogs,
	logMiddlewareErrors,
	logRateLimit,
} = require('../../config/route_logger');
setupGlobalErrorsLogs();

const bodyParser = require('body-parser');
const app = require('express')();

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const helmet = require('helmet');

const apollo = require('../../apollo');

const PORT = process.env.PORT || 4040;

// TODO: Support blacklisting JWTs
// TODO: Prevent brute-force attacks against authorization

// TODO: Implement rate limiter
// https://github.com/i0natan/nodebestpractices#-62-limit-concurrent-requests-using-a-middleware

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy');

const limiter = rateLimit({
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many accounts created from this IP, please try again after an hour',
	onLimitReached: logRateLimit,
	windowMs: 15 * 60 * 1000, // 15 minutes
});

const speedLimiter = slowDown({
	delayAfter: 75, // allow 100 requests per 15 minutes, then...
	delayMs: 500, // begin adding 500ms of delay per request above 100:
	windowMs: 15 * 60 * 1000, // 15 minutes
	// request # 101 is delayed by  500ms
	// request # 102 is delayed by 1000ms
	// request # 103 is delayed by 1500ms
	// etc.
});

// Limit concurrent requests using a middleware
app.use(speedLimiter);
app.use(limiter);

// Adjust the HTTP response headers for enhanced security
app.use(helmet());

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

// TODO: Do it with nginx: Limit payload size using a reverse-proxy or a middleware
app.use(bodyParser.json({ limit: '300kb' }));

app.use(logMiddlewareErrors);

app.use('/graphql', logApolloResponseBody);

apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
	// eslint-disable-next-line
	console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
