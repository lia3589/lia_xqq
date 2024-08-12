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

const PostList = ({ circleId }) => {
  const [posts, setPosts] = useState([]);
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

  return (
    <PostListContainer>
      {posts.length > 0 ? (
        posts.map(post => (
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
