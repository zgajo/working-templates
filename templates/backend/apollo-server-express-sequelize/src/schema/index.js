const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

let typeDefs = '';

// create GraphQL schema from every gql or graphql file
fs.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf('.') !== 0 && file !== basename && (file.endsWith('.gql') || file.endsWith('.graphql'));
	})
	.forEach(file => {
		typeDefs += fs.readFileSync(__dirname + '/' + file, 'utf8');
	});

module.exports = typeDefs;
