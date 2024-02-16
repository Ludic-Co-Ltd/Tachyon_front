import React, {useEffect} from 'react';

import { Routing } from './routes/Route';
import Auth from './utils/auth';

function App() {
  useEffect(() => {
    if (Auth.user_token) {
    const tokenExpiration = Auth.getTokenExpiration();
    const currentTime = new Date().getTime() / 1000;
    if (tokenExpiration && currentTime > parseInt(tokenExpiration)) {
      localStorage.removeItem('auth');
    }
	}
  }, [Auth]);
  return (
    <Routing />
  );
};

export default App;