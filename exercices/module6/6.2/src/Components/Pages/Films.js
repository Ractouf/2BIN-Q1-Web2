import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const Films = async () => {
  try {
    clearPage();
    const films = await getAllFilms();

    renderFilmTable(films);
    renderGoBackHomeButton();

  } catch (err) {
    console.error('HomePage::error: ', err);
  }
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

/*
function goToFilm() {
  const films = document.querySelectorAll('.film');
  films.forEach((film) => {
    film.addEventListener('click', () => {
      console.log(film)
      Navigate(`/films/1`)
    })
  })
}
*/

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
      <td>${film.title}</td>
      <td>${film.duration}</td>
      <td>${film.budget}</td>
      <td>${film.linkFilm}</td>
    </tr>`;
  });

  return tableLines;
}

export default Films;
