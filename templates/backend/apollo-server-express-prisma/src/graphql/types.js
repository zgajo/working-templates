const fs = require('fs');
const { importSchema } = require('graphql-import');

/**
 * Type definitions
 */

const allTypeDefs = fs
	.readdirSync(__dirname) // Read everything inside current folder
	.filter(f => fs.lstatSync(__dirname + '/' + f).isDirectory()) // filter all directories
	.map(f => {
		return fs.readFileSync(__dirname + `/${f}/${f}.graphql`, 'utf8'); // read file as string
	});

/**
 * https://github.com/prisma/graphql-import/issues/42#issuecomment-390400438
 * graphql-import doesn't support extend keyword.
 * Workaround is to have root schema which will handle imports and setting up empty main types
 * All other schemas need to be imported into array as string
 */
const rootSchema = importSchema(__dirname + '/' + '_root.graphql');

// Don't forget to import new typeDefs into schema.graphql
module.exports = [rootSchema, ...allTypeDefs];
