/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import pizzaImage from './img/pizza2.jpg';
import tab from "bootstrap/js/src/tab";

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

renderPizzaImage(pizzaImage);
renderText(TEXT);
createArray(5,5,"GUCCI");

function renderText(textJson) {
    let textLines = '';

    textJson?.forEach((text) => {
        textLines += `<h2>${text.text}</h2>`;
    });

    const wrapper = document.querySelector('.wrapper');

    wrapper.innerHTML += textLines;
}
function renderPizzaImage(pizzaUrl) {
    const image = new Image(); // or document.createElement('img');
    image.src = pizzaUrl;
    image.height = 200;
    const images = document.querySelector('.images');
    images.appendChild(image);
}

function createArray(lines, columns, initial) {
    const array = [];

    for (let i = 0; i < lines; i++) {
        array.push([]);
        for (let j = 0; j < columns; j++) {
            array[i].push(`${initial}[${i}][${j}]`);
        }
    }
    console.log(array)
    createHtmlTableAsString(array);

    const tableau = document.querySelector()
    return array;
}

function createHtmlTableAsString(array) {
    let tableau = '';

    array?.forEach((line) => {
        tableau += `<tr>`;
        line?.forEach((element) => {
            tableau += `<td>${element}</td>`;
        });
        tableau += `</tr>`
    });

    return tableau;
}
