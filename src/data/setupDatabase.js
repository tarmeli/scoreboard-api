const { MongoClient } = require('mongodb');
const {
    databaseURL,
    scoreboardDatabase,
} = require('../application-configuration');
const { noop } = require('lodash/fp');

const databaseClient = new MongoClient(databaseURL);

const initialiseDatabase = async () => {
    try {
        await databaseClient.connect();

        return {
            error: {
                isError: false,
                message: '',
            },
            database: databaseClient.db(scoreboardDatabase),
        };
    } catch (error) {
        return {
            error: {
                isError: true,
                message: `Database connection failed because of ${error}`,
            },
            database: {
                collection: noop,
            },
        };
    }
};

const initialiseCollection = async (collection) => {
    const { database, error } = await initialiseDatabase();

    return { error, collection: database.collection(collection) };
};

const doDatabaseTransaction = async (transaction) => {
    try {
        return await transaction();
    } catch (error) {
        throw `Database transaction: ${transaction.name} failed because of ${error}`;
    } finally {
        await databaseClient.close();
    }
};

module.exports = {
    initialiseCollection,
    doDatabaseTransaction,
};
