const { get } = require('lodash/fp');

const getEnvironmentVariable = (variable) => get(variable, process.env);

const config = {
    port: getEnvironmentVariable('PORT'),
    databaseURL: getEnvironmentVariable('DB_URL'),
    pingPongDatabase: getEnvironmentVariable('PINGPONG_DB'),
    playersCollection: getEnvironmentVariable('PLAYERS_COLLECTION'),
};

module.exports = config;
