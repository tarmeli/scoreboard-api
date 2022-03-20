const { ObjectId } = require('mongodb');

const {
    initialiseCollection,
    doDatabaseTransaction,
} = require('./setupDatabase');
const { playersCollection } = require('../application-configuration');

const getPlayer = async (playerID) => {
    const collection = await initialiseCollection(playersCollection);

    const getPlayerTransaction = async () =>
        await collection.findOne({ _id: ObjectId(playerID) });

    return doDatabaseTransaction(getPlayerTransaction);
};

const decrement = async (playerID, winsOrLosses) => {
    const player = await getPlayer(playerID);

    const collection = await initialiseCollection(playersCollection);

    await collection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] - 1 },
        }
    );

    return await getPlayers();
};

const increment = async (playerID, winsOrLosses) => {
    const player = await getPlayer(playerID);

    const collection = await initialiseCollection(playersCollection);

    await collection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] + 1 },
        }
    );

    return await getPlayers();
};

const getPlayers = async () => {
    const collection = await initialiseCollection(playersCollection);

    const getPlayersTransaction = async () => await collection.find().toArray();

    return {
        players: await doDatabaseTransaction(getPlayersTransaction),
    };
};

const addPlayer = async (player) => {
    const collection = await initialiseCollection(playersCollection);

    const addPlayerTransaction = async () => {
        await collection.insertOne({ name: player, wins: 0, losses: 0 });
    };

    await doDatabaseTransaction(addPlayerTransaction);

    return await getPlayers();
};

const removePlayer = async (playerID) => {
    const collection = await initialiseCollection(playersCollection);

    const removePlayerTransaction = async () => {
        await collection.deleteOne({ _id: ObjectId(playerID) });
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
