const { importSchema } = require('graphql-import');

module.exports = importSchema(__dirname + '/' + 'schema.graphql');
