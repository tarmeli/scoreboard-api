const { port } = require('../application-configuration');

const runServer = (app) => {
    app.listen(port, () => console.log(`Listening on ${port}!`));
};

module.exports = runServer;
