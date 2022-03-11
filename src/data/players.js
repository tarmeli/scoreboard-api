const { ObjectId } = require('mongodb');

const {
    initialiseCollection,
    doDatabaseTransaction,
} = require('./setupDatabase');
const {
    playersCollection: collection,
} = require('../application-configuration');

const getPlayer = async (playerID) => {
    const playersCollection = await initialiseCollection(collection);

    const getPlayerTransaction = async () =>
        await playersCollection.findOne({ _id: ObjectId(playerID) });

    return doDatabaseTransaction(getPlayerTransaction);
};

const decrement = async (playerID, winsOrLosses) => {
    const player = await getPlayer(playerID);

    const playersCollection = await initialiseCollection(collection);

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

    const playersCollection = await initialiseCollection(collection);

    await playersCollection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] + 1 },
        }
    );

    return await getPlayers();
};

const getPlayers = async () => {
    const playersCollection = await initialiseCollection(collection);

    const getPlayersTransaction = async () =>
        await playersCollection.find().toArray();

    return {
        players: await doDatabaseTransaction(getPlayersTransaction),
    };
};

const addPlayer = async (player) => {
    const { insertOne } = await initialiseCollection(collection);

    const addPlayerTransaction = async () => {
        await insertOne({ name: player, wins: 0, losses: 0 });
    };

    await doDatabaseTransaction(addPlayerTransaction);

    return await getPlayers();
};

const removePlayer = async (playerID) => {
    const { deleteOne } = await initialiseCollection(collection);

    const removePlayerTransaction = async () => {
        await deleteOne({ _id: ObjectId(playerID) });
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
