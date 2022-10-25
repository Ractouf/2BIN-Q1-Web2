const express = require('express');
const {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
    const allPizzasPotentiallyOrdered = readAllFilms(req?.query?.['minimum-duration']);

    return res.json(allPizzasPotentiallyOrdered);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
    const foundFilm = readOneFilm(req.params.id);

    if (!foundFilm) return res.sendStatus(404);

    return res.json(foundFilm);
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


    if (!title || !duration || !budget || !linkFilm) return res.sendStatus(400); // error code '400 Bad request'

    const createdFilm = createOneFilm(title, duration, budget, linkFilm);

    return res.json(createdFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
    const deletedFilm = deleteOneFilm(req.params.id);

    if (!deletedFilm) return res.sendStatus(404);

    return res.json(deletedFilm);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const linkFilm = req?.body?.linkFilm;

    if ((!title && !duration && !budget && !linkFilm) || title?.length === 0 || duration < 0 || budget < 0 || linkFilm?.length === 0)
        return res.sendStatus(400);

    const updatedFilm = updateOneFilm(req.params.id, {title, duration, budget, linkFilm});

    if (!updatedFilm) return res.sendStatus(404);

    return res.json(updatedFilm);
});

module.exports = router;
