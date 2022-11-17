import {clearPage} from "../../utils/render";
import Navigate from "../Router/Navigate";

const ModifyFilm = async () => {
    try {
        clearPage();

        displayCreateForm();
    } catch (err) {
        console.error('HomePage::error: ', err);
    }

    const modifyFilm = document.querySelector("#createFilm");
    modifyFilm.addEventListener("click", onCreateFilm);
};

function displayCreateForm() {
    const main = document.querySelector("main");

    const form = `
        <form>           
            <label for = "createTitle">title</label>
            <input id = "createTitle"/>
            <br/>
            <label for = "createDuration">duration</label>
            <input id = "createDuration"/>
            <br/>
            <label for = "createBudget">budget</label>
            <input id = "createBudget"/>
            <br/>
            <label for = "createLinkFilm">link film</label>
            <input id = "createLinkFilm"/>
            <br/>
            <button id = "createFilm">Submit</button>
        </form>`
    main.innerHTML += form;
}

async function onCreateFilm(e) {
    e.preventDefault();

    const title = document.querySelector('#createTitle').value;
    const duration = document.querySelector('#createDuration').value;
    const budget = document.querySelector('#createBudget').value;
    const linkFilm = document.querySelector('#createLinkFilm').value;

    const options = {
        method: 'POST',
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

    const response = await fetch(`/api/films`, options);

    if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    Navigate("/films");
}

export default ModifyFilm;