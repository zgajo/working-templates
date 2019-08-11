const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('apollo-server');

const middleware = require('../middleware');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

const schema = applyMiddleware(
	makeExecutableSchema({
		resolvers,
		typeDefs,
	}),
	middleware,
);

module.exports = schema;
