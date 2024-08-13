import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { likePost, unlikePost } from '../services/PostService';
import { addCircle } from '../services/CircleService'; // 确保导入了addCircle方法
import { getUserById } from '../services/AuthService'; // 导入getUserById方法

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

const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
`;

const InterestCircleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Post = ({ post }) => {
  console.log('Post:', post);
  const [liked, setLiked] = useState(post.liked || false);
  const [user, setUser] = useState(null);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [joined, setJoined] = useState(false);
  const pictures = Array.isArray(post.picture) && post.picture.length > 0 ? post.picture.slice(0, 4) : [];
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      getUserById(parsedUser.user.id).then(userData => {
        // console.log('Fetched user data:', userData);
        if (userData.user && userData.user.circlesIds && userData.user.circlesIds.includes(post.interest_circle_id)) {
          setJoined(true);
        } else {
          setJoined(false);
        }
      }).catch(error => {
        console.error('Failed to fetch user data:', error);
      });
    }
    setLiked(post.liked || false);
    setLikesCount(post.likes || 0);
  }, [post]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);
        setLikesCount(likesCount - 1);
      } else {
        await likePost(post.id);
        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    }
  };

  const handleJoinClick = async () => {
    if (joined) {
      navigate(`/circle/${post.interest_circle_id}`);
    } else {
      try {
        const response = await addCircle(user.id, post.interest_circle_id);
        console.log('Joined circle:', response);
        setJoined(true);
        navigate(`/circle/${post.interest_circle_id}`);
      } catch (error) {
        console.error('Failed to join circle:', error);
      }
    }
  };

  return (
    <PostContainer>
      <Header>
        <UserInfo>
          <Link to={`/profiles/${post.poster_id}`}>
            <Avatar src={post.poster_avatar} alt="avatar" />
          </Link>
          <Link to={`/profiles/${post.poster_id}`}>
            <span style={{ color: '#000000' }}>{post.poster}</span>
          </Link>
        </UserInfo>
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
        <Link to={`/posts/${post.id}`}><button>评论 ({post.comments.length})</button></Link>
      </Actions>
      <Separator />
      <InterestCircleContainer>
        <Link to={`/circle/${post.interest_circle_id}`}>{post.interest_circle}</Link>
        <button onClick={handleJoinClick}>{joined ? '已加入' : '加入'}</button>
      </InterestCircleContainer>
    </PostContainer>
  );
};

export default Post;
