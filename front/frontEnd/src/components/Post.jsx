import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const PostContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostTime = styled.span`
  color: #000000;
  font-size: 0.8em;
`;

const Title = styled.h2`
  color: #000000;
  font-weight: bold;
  font-size: 1em; 
  margin: 0 0 10px 0;
`;

const Content = styled.p`
  color: #000000;
  margin: 0 0 10px 0;
  text-align: left;
`;


const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const PictureContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const Picture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const pictures = post.picture && post.picture.length > 0 ? post.picture.slice(0, 4) : [];

  const handleLikeClick = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <PostContainer>
      <Header>
        <UserInfo>
          <Avatar src={post.poster_avatar} alt="avatar" />
          <span style={{ color: '#000000' }}>{post.poster}</span>
        </UserInfo>
        <Link to={`/interest_circle/${post.interest_circle_id}`}>{post.interest_circle}</Link>
      </Header>
      <Title>{post.title}</Title>
      <PostTime>{post.time}</PostTime>
      <Content>{post.content}</Content>
      {pictures.length > 0 && (
        <PictureContainer>
          {pictures.map((pic, index) => (
            <Picture key={index} src={pic} alt={`post-pic-${index}`} />
          ))}
        </PictureContainer>
      )}
      <Actions>
        <button onClick={handleLikeClick}>{liked ? '已点赞' : '点赞'} ({likesCount})</button>
        <Link to={`/post/${post.id}`}><button>评论 ({post.comment})</button></Link>
      </Actions>
    </PostContainer>
  );
};

export default Post;
