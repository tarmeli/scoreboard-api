const {
    getPlayers,
    addPlayer,
    removePlayer,
    getPlayer,
    increment,
    decrement,
} = require('../data/players');

const availableRoutes = [
    {
        route: '/',
        databaseMethod: () => ({ content: 'This is the home page' }),
        HTTPMethod: 'get',
        withParameters: false,
    },
    {
        route: '/players',
        databaseMethod: async () => await getPlayers(),
        HTTPMethod: 'get',
        withParameters: false,
    },
    {
        route: '/player/:id',
        databaseMethod: async (playerID) => await getPlayer(playerID),
        HTTPMethod: 'get',
        withParameters: true,
    },
    {
        route: '/player/:id/increment-wins',
        databaseMethod: async (playerID) => await increment(playerID, 'wins'),
        HTTPMethod: 'post',
        withParameters: true,
    },
    {
        route: '/player/:id/decrement-wins',
        databaseMethod: async (playerID) => await decrement(playerID, 'wins'),
        HTTPMethod: 'post',
        withParameters: true,
    },
    {
        route: '/player/:id/increment-losses',
        databaseMethod: async (playerID) => await increment(playerID, 'losses'),
        HTTPMethod: 'post',
        withParameters: true,
    },
    {
        route: '/player/:id/decrement-losses',
        databaseMethod: async (playerID) => await decrement(playerID, 'losses'),
        HTTPMethod: 'post',
        withParameters: true,
    },
    {
        route: '/player/:id/remove',
        databaseMethod: async (playerID) => await removePlayer(playerID),
        HTTPMethod: 'delete',
        withParameters: true,
    },
    {
        route: '/players/add/:name',
        databaseMethod: async (player) => await addPlayer(player),
        HTTPMethod: 'post',
        withParameters: true,
    },
];

module.exports = availableRoutes;
