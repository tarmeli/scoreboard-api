const { ObjectId } = require('mongodb');

const {
    initialiseCollection,
    doDatabaseTransaction,
} = require('./setupDatabase');

const getPlayer = async (playerID) => {
    const playersCollection = await initialiseCollection('players');

    const getPlayerTransaction = async () =>
        await playersCollection.findOne({ _id: ObjectId(playerID) });

    return doDatabaseTransaction(getPlayerTransaction);
};

const decrement = async (playerID, winsOrLosses) => {
    const player = await getPlayer(playerID);

    const playersCollection = await initialiseCollection('players');

    await playersCollection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] - 1 },
        }
    );

    return await getPlayers();
};

const increment = async (playerID, winsOrLosses) => {
    const player = await getPlayer(playerID);

    const playersCollection = await initialiseCollection('players');

    await playersCollection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] + 1 },
        }
    );

    return await getPlayers();
};

const getPlayers = async () => {
    const playersCollection = await initialiseCollection('players');

    const getPlayersTransaction = async () =>
        await playersCollection.find().toArray();

    return {
        players: await doDatabaseTransaction(getPlayersTransaction),
    };
};

const addPlayer = async (player) => {
    const playersCollection = await initialiseCollection('players');

    const addPlayerTransaction = async () => {
        await playersCollection.insertOne({ name: player, wins: 0, losses: 0 });
    };

    await doDatabaseTransaction(addPlayerTransaction);

    return await getPlayers();
};

const removePlayer = async (playerID) => {
    const playersCollection = await initialiseCollection('players');

    const removePlayerTransaction = async () => {
        await playersCollection.deleteOne({ _id: ObjectId(playerID) });
    };

    await doDatabaseTransaction(removePlayerTransaction);

    return await getPlayers();
};

module.exports = {
    getPlayers,
    addPlayer,
    removePlayer,
    getPlayer,
    decrement,
    increment,
};
