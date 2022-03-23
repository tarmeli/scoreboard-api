const { get, flow, join } = require('lodash/fp');
const decorate = require('./decorate');
const { handleNullOrUndefined } = require('./error-handling/index');

const getEnvironmentVariable = (variable) => {
    return get(variable, process.env);
};

const getConfiguration = (parameters) =>
    flow(
        decorate([handleNullOrUndefined])(getEnvironmentVariable),
        join('')
    )(parameters);

module.exports = getConfiguration;
