const { get } = require('lodash/fp');

const getEnvironmentVariable = (variable) => get(variable, process.env);

const config = {
    port: getEnvironmentVariable('PORT'),
    databaseURL: getEnvironmentVariable('DB_URL'),
};

module.exports = config;
