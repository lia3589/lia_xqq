import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useNavigate, Link } from 'react-router-dom';
import { getPosts, getCirclePosts } from '../services/PostService';
import styled from 'styled-components';

const PostListContainer = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const FloatingButton = styled.button`
  position: fixed; /* 固定在窗口右下角 */
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
  color: white;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const PostList = ({ circleId }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate('/posts/new');
  };

  const fetchPosts = async () => {
    try {
      let postsData;
      if (circleId === -1) {
        postsData = await getPosts();
      } else {
        postsData = await getCirclePosts(circleId);
      }
      // console.log('postsData:' + postsData);
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [circleId]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PostListContainer>
      <SearchBar
        type="text"
        placeholder="搜索帖子"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <EmptyMessage>空空如也，快来发帖</EmptyMessage>
      )}
      
      <FloatingButton onClick={handleAddPost}>+</FloatingButton>
    </PostListContainer>
  );
};

export default PostList;
