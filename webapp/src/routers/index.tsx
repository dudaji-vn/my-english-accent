import { Navigate, useLocation } from 'react-router-dom';
import Explore from '../pages/Explore';
import Member from '../pages/Members';
import Login from '../pages/Auth';
import PageNotFound from '../pages/NotFound';
import ROUTER from './router.const';
import { ReactElement } from 'react';
import Home from '../pages/Home';


function RequireAuth({ isLoggedIn, children }: { isLoggedIn: boolean, children: ReactElement }) {
  const location = useLocation();
  return isLoggedIn === true
    ? children
    : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

const routes = (isLoggedIn: boolean) => [
  {
    path: ROUTER.ROOT,
    element: <RequireAuth isLoggedIn={isLoggedIn}>
      <Home />
    </RequireAuth>,
  },
  {
    path: ROUTER.EXPLORE,
    element: <RequireAuth isLoggedIn={isLoggedIn}>
      <Explore />
    </RequireAuth>,
  },
  {
    path: ROUTER.MEMBERS,
    element: <RequireAuth isLoggedIn={isLoggedIn}>
      <Member />
    </RequireAuth>,
  },

  {
    path: ROUTER.LOGIN,
    element: !isLoggedIn ? <Login /> : <Navigate to={ROUTER.ROOT} />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;