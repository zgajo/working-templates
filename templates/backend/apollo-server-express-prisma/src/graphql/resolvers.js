const fs = require('fs');

const Query = fs
	.readdirSync(__dirname) // Read everything inside current folder
	.filter(f => fs.lstatSync(__dirname + '/' + f).isDirectory()) // filter all directories
	.filter(f => fs.existsSync(__dirname + `/${f}/${f}.query.js`))
	.reduce((prevVal, f) => {
		return {
			...prevVal,
			...require(`./${f}/${f}.query.js`),
		};
	}, {});

const Mutation = fs
	.readdirSync(__dirname) // Read everything inside current folder
	.filter(f => fs.lstatSync(__dirname + '/' + f).isDirectory()) // filter all directories
	.filter(f => fs.existsSync(__dirname + `/${f}/${f}.mutation.js`))
	.reduce((prevVal, f) => {
		return {
			...prevVal,
			...require(`./${f}/${f}.mutation.js`),
		};
	}, {});

const Subscription = fs
	.readdirSync(__dirname) // Read everything inside current folder
	.filter(f => fs.lstatSync(__dirname + '/' + f).isDirectory()) // filter all directories
	.filter(f => fs.existsSync(__dirname + `/${f}/${f}.mutation.js`))
	.reduce((prevVal, f) => {
		return {
			...prevVal,
			...require(`./${f}/${f}.mutation.js`),
		};
	}, {});

module.exports = {
	Mutation,
	Query,
	Subscription,
};
