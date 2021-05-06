let count = 0;

const theFunction = () => {
    count += 1;

    console.log('lol', count);

    return count < 50 && theFunction();
};

theFunction();
