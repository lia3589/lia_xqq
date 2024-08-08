import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import HomePage from './components/HomePage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import AddPost from './components/AddPost';
import userData from './components/UserData';

export const UserContext = createContext();

const defaultAvatar = 'src/assets/default-avatar.jpg';

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState({
    id: -1,
  });

  const handleLogin = (id) => {
    const userInfo = userData.find(user => user.id === id);
    if (userInfo) {
      setIsLogedIn(true);
      setUser(userInfo);
    } else {
      console.error("User not found in userData");
    }
  };

  const handleLogout = () => {
    setIsLogedIn(false);
    setUser({
      id: -1,
    });
  };

  return (
    <Router>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/homepage" element={<HomePage onLogout={handleLogout} />}>
            <Route index element={<PostList />} />
          </Route>
          <Route path="/profile/:id" element={<Profile id={user.id} />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/" element={isLogedIn ? <Navigate to="/homepage" /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
