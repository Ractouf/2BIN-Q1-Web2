import {clearPage} from "../../utils/render";

const Film = async () => {
    try {
        clearPage();
        const id = window.location.href.split("/")[4];
        const film = await getOneFilm(id);
        displayFilm(film);
    } catch (err) {
        console.error('HomePage::error: ', err);
    }
};

async function getOneFilm(id) {
    try {
        const response = await fetch(`/api/films/${id}`);

        if (!response.ok)
            throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        return await response.json();
    } catch (err) {
        console.error('getAllFilms::error: ', err);
        throw err;
    }
}

function displayFilm(film) {
    const main = document.querySelector("main");
    main.innerHTML += `
        <h1>${film.title}</h1>
        <p>${film.duration}</p>
        <p>${film.budget}</p>
        <p>${film.linkFilm}</p>`;
}

export default Film;