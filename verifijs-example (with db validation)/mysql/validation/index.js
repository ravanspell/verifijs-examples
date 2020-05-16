const Validation = require('verifijs');

const validation = new Validation();
// set bail all to stop validation when one validation rule stops.
validation.setBailAll(true);
validation.initMysqlConnection({
    host: process.env.DEV_HOST,//process.env.DB_HOST,
    user: process.env.DEV_U_NAME,//process.env.DB_USER_NAME,
    password: process.env.DEV_PASSWORD,//process.env.DB_PASSWORD,
    database: process.env.DEV_DB_NAME,//process.env.DB_NAME
});

module.exports = validation;