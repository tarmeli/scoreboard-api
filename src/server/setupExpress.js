const cors = require('cors');

const setupExpress = (express) => {
    express.use(cors());
};

module.exports = setupExpress;
