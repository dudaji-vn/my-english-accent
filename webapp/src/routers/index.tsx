import { Navigate, Outlet } from 'react-router-dom';
import Explore from '../pages/Explore';
import Member from '../pages/Members';
import Login from '../pages/Auth';
import PageNotFound from '../pages/NotFound';
import ROUTER from './router.const';

const routes = (isLoggedIn: boolean) => [
  {
    path: ROUTER.MEA,
    element: isLoggedIn ? <Outlet /> : <Navigate to={ROUTER.LOGIN} />,
    children: [
      { path: ROUTER.EXPLORE, element: <Explore /> },
      { path: ROUTER.MEMBERS, element: <Member /> },
    ],
  },
  {
    path: ROUTER.ROOT,
    element: !isLoggedIn ? <Outlet /> : <Navigate to={ROUTER.MEA} />,
    children: [
      { path: ROUTER.LOGIN, element: <Login /> },
      { path: ROUTER.ROOT, element: <Navigate to={ROUTER.LOGIN} /> },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;