import HomePage from '../Pages/HomePage';
import Films from '../Pages/Films';
import Film from "../Pages/Film";
import ModifyFilm from "../Pages/ModifyFilm";
import addFilm from "../Pages/addFilm";

const routes = {
  '/': HomePage,
  '/films': Films,
  '/films/add': addFilm,
  '/film': Film,
  '/film/modify': ModifyFilm
};

export default routes;
