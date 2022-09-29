/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import pizzaImage from './img/pizza2.jpg';

const TEXT = [
    {
        id: 1,
        text: 'GucciMan Damien'
    },
    {
        id: 2,
        text: 'GucciMan Miguel'
    },
    {
        id: 3,
        text: 'GucciMan Corentin'
    },
    {
        id: 1,
        text: 'GucciMan Maev'
    }
];

let lines = document.querySelector("#lines");
const columns = document.querySelector("#columns");
const initalText = document.querySelector("#initialText");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    createTable(lines.value, columns.value, initalText.value);
})


renderPizzaImage(pizzaImage);
renderText(TEXT);

function renderText(textJson) {
    let textLines = '';

    textJson?.forEach((text) => {
        textLines += `<h2>${text.text}</h2>`;
    });

    const wrapper = document.querySelector('.texte');

    wrapper.innerHTML += textLines;
}
function renderPizzaImage(pizzaUrl) {
    const image = new Image(); // or document.createElement('img');
    image.src = pizzaUrl;
    image.height = 200;
    const images = document.querySelector('.images');
    images.appendChild(image);
}

function createTable(lines, columns, initial) {
    let array = createArray(lines, columns, initial);
    let table = createHtmlTableAsString(array);

    const tableau = document.querySelector(".tableau");
    tableau.innerHTML += table
}

function createArray(lines, columns, initial) {
    const array = [];

    for (let i = 0; i < lines; i++) {
        array.push([]);
        for (let j = 0; j < columns; j++) {
            array[i].push(`${initial}[${i}][${j}]`);
        }
    }
    return array;
}

function createHtmlTableAsString(array) {
    let tableau = '<table>';

    array?.forEach((line) => {
        tableau += `<tr>`;
        line?.forEach((element) => {
            tableau += `<td>${element}</td>`;
        });
        tableau += `</tr>`
    });
    tableau += '</table>'
    return tableau;
}
