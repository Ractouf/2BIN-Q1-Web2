import HomePage from '../Pages/HomePage';
import Films from '../Pages/Films';
import Film from '../Pages/Film'

const routes = {
  '/': HomePage,
  '/films': Films,
  '/films/:id': Film
};

export default routes;
