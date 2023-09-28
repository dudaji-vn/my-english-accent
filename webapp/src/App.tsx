import React, { useState } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routers';

function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const routing = useRoutes(routes(isLoggedIn));
  return (
    <>
      {routing}
      <button onClick={() => {
        setIsLoggedIn(!isLoggedIn)
      }}>
        {!isLoggedIn ? 'Log in' : 'Log out'}
      </button>
    </>
  );
}

export default App;


