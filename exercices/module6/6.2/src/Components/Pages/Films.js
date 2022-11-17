import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const Films = async () => {
    try {
        clearPage();
        const films = await getAllFilms();

        renderFilmTable(films);

        displayAddFilm();

        renderGoBackHomeButton();

    } catch (err) {
        console.error('HomePage::error: ', err);
    }

    const deleteButtons = document.querySelectorAll(".deleteFilm");
    const modifyButtons = document.querySelectorAll(".modifyFilm");
    const goToButtons = document.querySelectorAll(".goToFilm");
    const addFilmButton = document.querySelector("#addFilm");

    deleteButtons.forEach((item) => {
        item.addEventListener('click', onDeleteFilm);
    });

    modifyButtons.forEach((item) => {
        item.addEventListener('click', onModifyFilm);
    });

    goToButtons.forEach((item) => {
        item.addEventListener('click', onGoToFilm);
    });

    addFilmButton.addEventListener("click", onAddFilm);
};

function renderGoBackHomeButton() {
    const main = document.querySelector('main');
    const submit = document.createElement('input');
    submit.value = 'Go back to HomePage';
    submit.className = 'btn btn-secondary mt-3';
    submit.addEventListener('click', () => {
        Navigate('/');
    });

    main.appendChild(submit);
}

async function getAllFilms() {
    try {
        const response = await fetch('/api/films');

        if (!response.ok)
            throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        return await response.json();
    } catch (err) {
        console.error('getAllFilms::error: ', err);
        throw err;
    }
}

function renderFilmTable(films) {
    const filmTable = getTable(films);

    const main = document.querySelector('main');

    main.innerHTML += filmTable;
}

function getTable(films) {
    const tableLines = getAllTableLines(films);
    return tableHeaders(tableLines);
}

function tableHeaders(tableLines) {
    return `
  <div class="table-responsive pt-5">
    <table class="table table-danger menu">
      <tr>
        <th>Film</th>
        <th>Duration</th>
        <th>Budget</th>
        <th>Link</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      ${tableLines}    
    </table>
  </div>
  `;
}

function getAllTableLines(menu) {
    let tableLines = '';

    menu?.forEach((film) => {
        tableLines += `
            <tr class = "film">
                <td class = "goToFilm" data-id = "${film.id}">${film.title}</td>
                <td class = "goToFilm" data-id = "${film.id}">${film.duration}</td>
                <td class = "goToFilm" data-id = "${film.id}">${film.budget}</td>
                <td class = "goToFilm" data-id = "${film.id}">${film.linkFilm}</td>
                <td><button class = "modifyFilm" data-id = "${film.id}">Modify</button></td>
                <td><button class = "deleteFilm" data-id = "${film.id}">Delete</button></td>
            </tr>`;
    });

    return tableLines;
}

function displayAddFilm() {
    const main = document.querySelector("main");
    main.innerHTML += `<button id = "addFilm">Add film</button>`
}

async function onDeleteFilm(e) {
    const id = e.target?.dataset?.id;

    const response = await fetch(`/api/films/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    await Films();
}

function onModifyFilm(e) {
    const id = e.target?.dataset?.id;
    Navigate(`/film/modify/${id}`);
}

function onGoToFilm(e) {
    const id = e.target?.dataset?.id;
    Navigate(`/film/${id}`);
}

function onAddFilm(e) {
    e.preventDefault();
    Navigate(`/films/add`);
}

export default Films;
