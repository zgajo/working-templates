require('dotenv').config();

module.exports = {
	apps: [
		{
			args: 'start',
			name: `${process.env.PM2_APP_NAME}` + `${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`,
			script: 'npm',
		},
	],
};
