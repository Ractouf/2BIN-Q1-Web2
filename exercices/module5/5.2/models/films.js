const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
    {
        id: 1,
        title: '4 fromages',
        duration: 100,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 2,
        title: 'Vegan',
        duration: 100,
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
        duration: 100,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    },
    {
        id: 5,
        title: 'Diable',
        duration: 100,
        budget: 20000,
        linkFilm: 'https://www.youtube.com/'
    }
];

function readAllPizzas(filter) {
    const filterDuration = filter?.includes['minimum-duration']
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

function readOnePizza(id) {
    const idNumber = parseInt(id, 10);
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const indexOfPizzaFound = pizzas.findIndex((pizza) => pizza.id === idNumber);
    if (indexOfPizzaFound < 0) return undefined;

    return pizzas[indexOfPizzaFound];
}

function createOnePizza(title, content) {
    const pizzas = parse(jsonDbPath, defaultPizzas);

    const createdPizza = {
        id: getNextId(),
        title,
        content,
    };

    pizzas.push(createdPizza);

    serialize(jsonDbPath, pizzas);

    return createdPizza;
}

function getNextId() {
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const lastItemIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = pizzas[lastItemIndex]?.id;
    return lastId + 1;
}

function deleteOnePizza(id) {
    const idNumber = parseInt(id, 10);
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const foundIndex = pizzas.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedPizzas = pizzas.splice(foundIndex, 1);
    const deletedPizza = deletedPizzas[0];
    serialize(jsonDbPath, pizzas);

    return deletedPizza;
}

function updateOnePizza(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const foundIndex = pizzas.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;

    const updatedPizza = { ...pizzas[foundIndex], ...propertiesToUpdate };

    pizzas[foundIndex] = updatedPizza;

    serialize(jsonDbPath, pizzas);

    return updatedPizza;
}

module.exports = {
    readAllPizzas,
    readOnePizza,
    createOnePizza,
    deleteOnePizza,
    updateOnePizza,
};
