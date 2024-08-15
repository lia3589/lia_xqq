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
import Circle from './components/Circle';
import CreateCircle from './components/CreateCircle';
import CircleExplore from './components/CircleExplore';

export const UserContext = createContext();

const defaultAvatar = 'src/assets/default-avatar.jpg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  
    const checkAuthentication = async () => {
      try {
        const user = await checkAuth();
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        handleLogout();
      }
    };
    
    checkAuthentication();
  }, []);
  

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    console.log("User logged in", user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const NotFound = () => {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    );
  };

  return (
    <Router>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/homepage" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />}>
            <Route index element={<PostList circleId={-1} />} />
          </Route>
          <Route path='/circle/:id' element={isLoggedIn ? <Circle /> : <Navigate to="/" />}></Route>
          <Route path='/circle/create' element={isLoggedIn ? <CreateCircle /> : <Navigate to="/" />}></Route>
          <Route path='/circle/explore' element={isLoggedIn ? <CircleExplore /> : <Navigate to="/" />}></Route>
          <Route path="/profiles/:id" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
          <Route path="/posts/new" element={isLoggedIn ? <AddPost /> : <Navigate to="/" />} />
          <Route path="/posts/:id" element={isLoggedIn ? <PostDetail /> : <Navigate to="/" />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/homepage" /> : <Login onLogin={handleLogin} />} />
          <Route path='/index.html' element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/index.html" />} />

          
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
