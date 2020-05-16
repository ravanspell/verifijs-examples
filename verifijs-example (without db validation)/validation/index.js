const Validation = require('verifijs');

const validation = new Validation();
// set bail all to stop validation when one validation rule stops.
validation.setBailAll(true);

module.exports = validation;