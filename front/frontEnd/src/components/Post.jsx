import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <div>
        <img src="avatar.png" alt="avatar" />
        <span>发帖人昵称</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button>点赞 {post.likes}</button>
      <Link to={`/post/${post.id}`}>评论</Link>
      <Link to="/interest-circle">兴趣圈</Link>
    </PostContainer>
  );
};

export default Post;
