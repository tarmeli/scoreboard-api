const { getConfiguration } = require('./utilities/index');

const applicationConfiguration = {
    port: getConfiguration('PORT'),
    databaseURL: getConfiguration('DATABASE_URL'),
    scoreboardDatabase: getConfiguration('SCOREBOARD_DATABASE'),
    playersCollection: getConfiguration('PLAYERS_COLLECTION'),
};

module.exports = applicationConfiguration;
