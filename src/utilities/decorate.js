/* eslint-disable prettier/prettier,indent */
const { map } = require('lodash/fp');

const decorate = (decorators) => {
    return (toBeDecorated, ...parameters) => {
        if (parameters) {
            return map(
                (decorator) => decorator(toBeDecorated, ...parameters),
                decorators
            );
        }

        return map((decorator) => decorator(toBeDecorated), decorators);
    };
};

module.exports = decorate;
