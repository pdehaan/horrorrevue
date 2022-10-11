// ./_site/_data/letterboxd.js

const letterboxd = require('letterboxd');

module.exports = async () => {
    const items = letterboxd('horrorrevue', (error, items) => {
        if (error) {
            return console.log(error);
        }
    });

    return items;
};