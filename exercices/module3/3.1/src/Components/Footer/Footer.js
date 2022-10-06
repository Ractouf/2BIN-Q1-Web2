import Navigate from '../Router/Navigate';
import pizza2 from '../../img/pizza2.jpg';

const Footer = () => {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <h1>
            Pogpog
        </h1>
    `;

    renderSmallImage(footer, pizza2, 'cheesePizza');
    attachOnPizzaClick();
};

export default Footer;

function renderSmallImage(wrapper, url, id) {
    const image = new Image(); // or document.createElement('img');
    image.src = url;
    image.height = 50;
    if (id) image.id = id;
    wrapper.appendChild(image);
}

function attachOnPizzaClick() {
    const pizza = document.querySelector('#cheesePizza');
    pizza.addEventListener('click', () => {
        Navigate('/');
    });
}
