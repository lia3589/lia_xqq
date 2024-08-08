import React, { useState, useEffect } from 'react';
import Post from './Post';
import styled from 'styled-components';
import postsData from './PostData';

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
    setPosts(postsData);
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
