'use strict';

var dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
const src = env === 'production' ? './build/index' : './src/index';

require('babel-polyfill');
if (env === 'development') { require('babel-register'); }

const app = require(src).default;

//Here we're assigning the server to a variable because
//we're going to want to manually rip down the server in testing
const server = app.listen(port);
console.log('Server running at ' + port);
console.log("Running in "  + process.env.NODE_ENV + " v" + process.env.npm_package_version);
var connection = {
    env: process.env.NODE_ENV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE + '_development',
};
console.log(connection)

//Exporting the actual server here for testing availability
module.exports = {server: server}