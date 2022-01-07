const { map } = require('lodash/fp');
const availableRoutes = require('./availableRoutes');

const setupRoutes = (express) => mapToRoutes(express)(availableRoutes);

const mapToRoutes = (express) => {
    return map(({ route, databaseMethod, HTTPMethod, withParameters }) =>
        express[HTTPMethod](route, async (request, response) => {
            if (withParameters) {
                const data = await databaseMethod(
                    request.params.id || request.params.name
                );

                return response.send(data);
            }

            const data = await databaseMethod();

            return response.send(data);
        })
    );
};

module.exports = setupRoutes;
