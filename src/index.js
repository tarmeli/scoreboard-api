const express = require('express');
const runServer = require('./server/runServer');
const setupRoutes = require('./routes/setupRoutes');
const setupExpress = require('./server/setupExpress');

const app = express();

setupExpress(app);
setupRoutes(app);

runServer(app);
