const { MongoClient } = require('mongodb');
const config = require('../config');

const databaseURI = config.databaseURL;

const databaseClient = new MongoClient(databaseURI);

const initialiseDatabase = async () => {
    await databaseClient.connect();

    return databaseClient.db('pingpong');
};

const initialiseCollection = async (collection) => {
    const database = await initialiseDatabase();

    return database.collection(collection);
};

const doDatabaseTransaction = async (transaction) => {
    try {
        return await transaction();
    } catch (error) {
        console.log(`Database transaction failed because of ${error}`);
    } finally {
        await databaseClient.close();
    }
};

module.exports = {
    initialiseCollection,
    databaseClient,
    doDatabaseTransaction,
};
