const Query = require('./query');
const Mutation = require('./mutation');
const Types = require('./custom_types');

// A map of functions which return data for the schema.
const resolvers = {
	Mutation,
	Query,
	...Types,
};

module.exports = resolvers;
