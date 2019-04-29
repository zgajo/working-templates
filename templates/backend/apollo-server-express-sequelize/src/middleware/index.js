const { rule, shield } = require('graphql-shield');

// Rules
const isAuthenticated = rule()(async (parent, args, ctx) => {
	return !!ctx.request.headers.user;
});

// Permissions
const permissions = shield({
	Query: {
		hello: isAuthenticated,
	},
});

module.exports = permissions;
