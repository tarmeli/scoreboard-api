const { get } = require('lodash/fp');

const getEnvironmentVariable = (variable) => get(variable, process.env);

const applicationConfiguration = {
    port: getEnvironmentVariable('PORT'),
    databaseURL: getEnvironmentVariable('DATABASE_URL'),
    scoreboardDatabase: getEnvironmentVariable('SCOREBOARD_DATABASE'),
    playersCollection: getEnvironmentVariable('PLAYERS_COLLECTION'),
};

module.exports = applicationConfiguration;
