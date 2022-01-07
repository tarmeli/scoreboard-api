const config = require('../config');

const runServer = (app) => {
    app.listen(config.port, () => console.log(`Listening on ${config.port}!`));
};

module.exports = runServer;
