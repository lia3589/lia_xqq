import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Profile from './Profile';
import AddPost from './AddPost';
import { GlobalStyles } from '../styles/globalStyles.jsx';

function HomePage() {
  return (
    <Router>
      <GlobalStyles />
      <Sidebar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
