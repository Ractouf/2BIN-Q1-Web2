const express = require('express');
const { serialize, parse } = require('../utils/json');
const router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const FILMS = [
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

/* Read all the films
   GET /films?order=title : ascending order by title
   GET /films?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
    console.log(req.query);
    const filterDuration = req?.query?.['minimum-duration']
        ? req.query['minimum-duration']
        : undefined;

    let filteredFilms;

    console.log(`order by ${filterDuration ?? 'not requested'}`);

    const films = parse(jsonDbPath, FILMS);

    if (filterDuration)
        filteredFilms = [...films].filter(a => {
        return parseInt(a.duration, 10) > filterDuration;
    });

    console.log('GET /films');
    res.json(filteredFilms ?? films);
});


// Read the film identified by an id
router.get('/:id', (req, res) => {
    console.log(`GET /pizzas/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);

    const indexOfFilmFound = films.findIndex(film => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(404);

    res.json(films[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0
        ? req.body.title
        : undefined;

    const duration = req?.body?.duration > 0
        ? req.body.duration
        : undefined;

    const budget = req?.body?.budget > 0
        ? req.body.budget
        : undefined;

    const linkFilm = req?.body?.linkFilm?.length !== 0
        ? req.body.linkFilm
        : undefined;

    console.log('POST /films');

    if (!title || !duration || !budget || !linkFilm)
        return res.sendStatus(400);

    const films = parse(jsonDbPath, FILMS);

    const lastItemIndex = films?.length !== 0
        ? films.length - 1
        : undefined;

    const lastId = lastItemIndex !== undefined
        ? films[lastItemIndex]?.id
        : 0;

    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        linkFilm: linkFilm
    };

    films.push(newFilm);

    serialize(jsonDbPath, films);

    res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromFilms = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromFilms[0];

    serialize(jsonDbPath, films);

    res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const linkFilm = req?.body?.linkFilm;

    console.log('POST /films');

    if ((!title && !duration && !budget && !linkFilm) || title?.length === 0 || duration < 0 || budget < 0 || linkFilm?.length === 0)
        return res.sendStatus(400);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0)
        return res.sendStatus(404);

    const updatedFilm = {...films[foundIndex], ...req.body};
    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    res.json(updatedFilm);
});


module.exports = router;
