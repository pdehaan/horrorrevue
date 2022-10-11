// ./_site/_data/letterboxd.js

const letterboxd = require('letterboxd');

module.exports = async () => {
    const itmes = letterboxd('horrorrevue', (error, items) => {
        if (error) {
            return console.log(error);
        }
    });

    return items;
};