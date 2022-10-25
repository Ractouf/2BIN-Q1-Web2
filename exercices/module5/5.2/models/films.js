const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
    {
        id: 1,
        title: '4 fromages',
        duration: 80,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 2,
        title: 'Vegan',
        duration: 50,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 3,
        title: 'Vegetarian',
        duration: 100,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 4,
        title: 'Alpage',
        duration: 200,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 5,
        title: 'Diable',
        duration: 10,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    }
];

function readAllFilms(filter) {
    const filterDuration = filter > 0
        ? filter
        : undefined;

    let filteredFilms;

    const films = parse(jsonDbPath, defaultFilms);

    if (filterDuration)
        filteredFilms = [...films].filter(a => {
            return parseInt(a.duration, 10) > filterDuration;
        });

    return filteredFilms ?? films;
}

function readOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);

    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if (indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, linkFilm) {
    const films = parse(jsonDbPath, defaultFilms);

    const createdFilm = {
        id: getNextId(),
        title,
        duration,
        budget,
        linkFilm
    };

    films.push(createdFilm);

    serialize(jsonDbPath, films);

    return createdFilm;
}

function getNextId() {
    const films = parse(jsonDbPath, defaultFilms);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    return lastId + 1;
}

function deleteOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);

    const foundIndex = films.findIndex((film) => film.id === idNumber);

    if (foundIndex < 0)
        return undefined;

    const deletedFilms = films.splice(foundIndex, 1);

    const deletedFilm = deletedFilms[0];
    serialize(jsonDbPath, films);

    return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const foundIndex = films.findIndex((film) => film.id === idNumber);

    if (foundIndex < 0)
        return undefined;

    Object.keys(propertiesToUpdate).forEach(key => {
        if (propertiesToUpdate[key] === undefined) {
            delete propertiesToUpdate[key];
        }
    });

    const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
};
