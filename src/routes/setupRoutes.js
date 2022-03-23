const { map } = require('lodash/fp');
const availableRoutes = require('./routes-configuration');

const setupRoutes = (express) => mapToRoutes(express)(availableRoutes);

const mapToRoutes = (express) =>
    map(({ route, databaseMethod, HTTPMethod, withParameters }) =>
        express[HTTPMethod](route, async (request, response) => {
            if (withParameters) {
                const {
                    error: { isError, message },
                    data,
                } = await databaseMethod(
                    request.params.id || request.params.name
                );

                if (isError) {
                    response.status(500);
                }

                return response.send({
                    data,
                    error: {
                        isError,
                        message,
                    },
                });
            }

            const {
                error: { isError, message },
                data,
            } = await databaseMethod();

            if (isError) {
                response.status(500);
            }

            return response.send({
                data,
                error: {
                    isError,
                    message,
                },
            });
        })
    );

module.exports = setupRoutes;
