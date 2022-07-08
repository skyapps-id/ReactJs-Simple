import Home from './views/Home';
import Movie from './views/Movie';

interface Routes {
  path: string;
  element: React.ReactElement;
}

const routes: Routes[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/movie',
    element: <Movie />
  }
];

export default routes;
