import React, { useState, createContext } from 'react';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';

export const UserContext = createContext();

const defaultAvatar = 'src/assets/default-avatar.jpg';

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState({
    username: 'defaultUser',
    password: 'defaultPassword',
    avatar: defaultAvatar,
  });

  const handleLogin = (username, password) => {
    setIsLogedIn(true);
    setUserContext(username, password, defaultAvatar);
  };

  const setUserContext = (username, password, avatar) => {
    setUser({
      username,
      password,
      avatar,
    });
  };

  return (
    <UserContext.Provider value={user}>
      <>
        {isLogedIn ? (
          <HomePage path="/" />
        ) : (
          <Login path="/Login" onLogin={handleLogin} />
        )}
      </>
    </UserContext.Provider>
  );
}

export default App;
