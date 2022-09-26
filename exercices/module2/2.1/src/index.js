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

renderPizzaImage(pizzaImage);
renderText(TEXT)

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
