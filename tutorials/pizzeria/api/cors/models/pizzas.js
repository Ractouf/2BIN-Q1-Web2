const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const defaultPizzas = [
    {
        id: 1,
        title: '4 fromages',
        content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
    },
    {
        id: 2,
        title: 'Vegan',
        content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
    },
    {
        id: 3,
        title: 'Vegetarian',
        content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
    },
    {
        id: 4,
        title: 'Alpage',
        content: 'Gruyère, Mozarella, Lardons, Tomates',
    },
    {
        id: 5,
        title: 'Diable',
        content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
    },
];

function readAllPizzas(orderBy) {
    const orderByTitle = orderBy?.includes('title') ? orderBy : undefined;
    let orderedMenu;
    const pizzas = parse(jsonDbPath, defaultPizzas);
    if (orderByTitle)
        orderedMenu = [...pizzas].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

    return orderedMenu ?? pizzas;
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
