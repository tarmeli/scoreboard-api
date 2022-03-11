const { MongoClient } = require('mongodb');
const {
    databaseURL,
    scoreboardDatabase,
} = require('../application-configuration');

const databaseClient = new MongoClient(databaseURL);

const initialiseDatabase = async () => {
    await databaseClient.connect();

    return databaseClient.db(scoreboardDatabase);
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
    doDatabaseTransaction,
};
