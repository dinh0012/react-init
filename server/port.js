const argv = require('./argv');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '.env')});
module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
