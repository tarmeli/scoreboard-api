const { isNil } = require('lodash/fp');

const handleAsyncCall = async (toBeHandled) => {
    try {
        return await toBeHandled();
    } catch (error) {
        return `${toBeHandled.name} failed because of ${error}`;
    }
};

const handleNullOrUndefined = (toBeHandled) => (parameters) =>
    isNil(toBeHandled(parameters))
        ? throwForFunctionWithParameters(toBeHandled.name, parameters)
        : toBeHandled(parameters);

const throwForFunctionWithParameters = (
    failedFunction,
    parametersOfFailedFunction
) => {
    throw `"${failedFunction}" returned undefined or null with parameters "${parametersOfFailedFunction}"`;
};

module.exports = {
    handleNullOrUndefined,
    handleAsyncCall,
};
