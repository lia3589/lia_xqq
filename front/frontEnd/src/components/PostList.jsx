import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/PostService'
import styled from 'styled-components';

const PostListContainer = styled.div`
  width: 100%;
  padding: 20px;
  position : relative;
  display: flex;
  flex-wrap: wrap;
  jusify-content: center;
  align-items: center;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <PostListContainer>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </PostListContainer>
  );
};

export default PostList;
