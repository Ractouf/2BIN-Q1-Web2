import {clearPage} from "../../utils/render";

const HomePage = async () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += `<h2>Hello</h2>`
};

export default HomePage;
