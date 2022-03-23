const { ObjectId } = require('mongodb');

const {
    initialiseCollection,
    doDatabaseTransaction,
} = require('../data/setupDatabase');
const { playersCollection } = require('../application-configuration');

const getPlayer = async (playerID) => {
    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    const getPlayerTransaction = async () =>
        await collection.findOne({ _id: ObjectId(playerID) });

    return {
        error: { isError, message },
        data: { player: await doDatabaseTransaction(getPlayerTransaction) },
    };
};

const decrement = async (playerID, winsOrLosses) => {
    const {
        data: { player },
    } = await getPlayer(playerID);

    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    await collection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] - 1 },
        }
    );

    const { data } = await getPlayers();

    return {
        error: { isError, message },
        data,
    };
};

const increment = async (playerID, winsOrLosses) => {
    const {
        data: { player },
    } = await getPlayer(playerID);

    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    await collection.updateOne(
        { _id: ObjectId(playerID) },
        {
            $set: { [winsOrLosses]: player[winsOrLosses] + 1 },
        }
    );

    const { data } = await getPlayers();

    return {
        error: { isError, message },
        data,
    };
};

const getPlayers = async () => {
    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    const getPlayersTransaction = async () => await collection.find().toArray();

    return {
        error: { isError, message },
        data: {
            players: await doDatabaseTransaction(getPlayersTransaction),
        },
    };
};

const addPlayer = async (player) => {
    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    const addPlayerTransaction = async () => {
        await collection.insertOne({ name: player, wins: 0, losses: 0 });
    };

    await doDatabaseTransaction(addPlayerTransaction);

    const { data } = await getPlayers();

    return {
        error: {
            isError,
            message,
        },
        data,
    };
};

const removePlayer = async (playerID) => {
    const {
        error: { isError, message },
        collection,
    } = await initialiseCollection(playersCollection);

    if (isError) {
        return {
            error: {
                isError,
                message,
            },
            data: null,
        };
    }

    const removePlayerTransaction = async () => {
        await collection.deleteOne({ _id: ObjectId(playerID) });
    };

    await doDatabaseTransaction(removePlayerTransaction);

    const { data } = await getPlayers();

    return {
        error: {
            isError,
            message,
        },
        data,
    };
};

module.exports = {
    getPlayers,
    addPlayer,
    removePlayer,
    getPlayer,
    decrement,
    increment,
};
