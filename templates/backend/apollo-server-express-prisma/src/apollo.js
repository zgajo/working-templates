const { ApolloServer } = require('apollo-server-express');

const prisma = require('./prisma-client');

const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');

const apollo = new ApolloServer({
	context: ({ req }) => ({ prisma, request: req }),
	resolvers,
	schema,
	typeDefs,
});

module.exports = apollo;
