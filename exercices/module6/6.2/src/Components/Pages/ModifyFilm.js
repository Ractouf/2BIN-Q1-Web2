import {clearPage} from "../../utils/render";
import Navigate from "../Router/Navigate";

const ModifyFilm = async () => {
    try {
        clearPage();

        const id = window.location.href.split("/")[5];

        const film = await getOneFilm(id);
        displayModifyForm(film);
    } catch (err) {
        console.error('HomePage::error: ', err);
    }

    const modifyFilm = document.querySelector("#modifyFilm");
    modifyFilm.addEventListener("click", onModifyFilm);
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

function displayModifyForm(film) {
    const main = document.querySelector("main");

    const form = `
        <form>           
            <label for = "modifyTitle">title</label>
            <input id = "modifyTitle" value="${film.title}"/>
            <br/>
            <label for = "modifyDuration">duration</label>
            <input id = "modifyDuration" value="${film.duration}"/>
            <br/>
            <label for = "modifyBudget">budget</label>
            <input id = "modifyBudget" value="${film.budget}"/>
            <br/>
            <label for = "modifyLinkFilm">link film</label>
            <input id = "modifyLinkFilm" value="${film.linkFilm}"/>
            <br/>
            <button id = "modifyFilm">Submit</button>
        </form>`
    main.innerHTML += form;
}

async function onModifyFilm(e) {
    e.preventDefault();

    const title = document.querySelector('#modifyTitle').value;
    const duration = document.querySelector('#modifyDuration').value;
    const budget = document.querySelector('#modifyBudget').value;
    const linkFilm = document.querySelector('#modifyLinkFilm').value;

    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            title,
            duration,
            budget,
            linkFilm
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`/api/films/${window.location.href.split("/")[5]}`, options);

    if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    Navigate("/films");
}

export default ModifyFilm;