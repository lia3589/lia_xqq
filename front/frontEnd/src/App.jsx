import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import HomePage from './components/HomePage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import AddPost from './components/AddPost';
import { checkAuth } from './services/AuthService';

export const UserContext = createContext();

const defaultAvatar = 'src/assets/default-avatar.jpg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await checkAuth();
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/homepage" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />}>
            <Route index element={<PostList />} />
          </Route>
          <Route path="/profiles/:id" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
          <Route path="/posts/new" element={isLoggedIn ? <AddPost /> : <Navigate to="/" />} />
          <Route path="/posts/:id" element={isLoggedIn ? <PostDetail /> : <Navigate to="/" />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/homepage" /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
