let count = 0;

const theFunction = (callback) => {
    count += 1;

    console.log('lol', count);

    return count < 50 && callback(callback);
};

theFunction(theFunction);
