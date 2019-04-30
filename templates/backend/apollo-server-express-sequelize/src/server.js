const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const middleware = require('./middleware');
const models = require('./models');
const batchFunctions = require('./utils/dataloader_batch_functions');

const server = new ApolloServer({
	context: ({ req }) => ({ batchFunctions: batchFunctions(models), models, request: req }),
	resolvers,
	schema: applyMiddleware(makeExecutableSchema({ resolvers, typeDefs }), middleware),
	typeDefs,
});

server.listen().then(({ url }) => {
	// eslint-disable-next-line
	console.log(`🚀 Server ready at ${url}`);
});
