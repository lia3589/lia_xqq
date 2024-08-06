import React, { useState, useEffect } from 'react';
import Post from './Post';
import styled from 'styled-components';

const PostListContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 模拟数据获取
    setPosts([
      { id: 1, title: '帖子1', content: '这是帖子1的内容', likes: 0, comments: [] },
      { id: 2, title: '帖子2', content: '这是帖子2的内容', likes: 0, comments: [] },
    ]);
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
