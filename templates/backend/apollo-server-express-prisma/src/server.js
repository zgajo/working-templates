const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const middleware = require('./middleware');
const prisma = require('../generated/prisma-client');

const server = new ApolloServer({
	context: ({ req }) => ({ prisma, request: req }),
	resolvers,
	schema: applyMiddleware(makeExecutableSchema({ resolvers, typeDefs }), middleware),
	typeDefs,
});

server.listen().then(({ url }) => {
	// eslint-disable-next-line
	console.log(`🚀 Server ready at ${url}`);
});
