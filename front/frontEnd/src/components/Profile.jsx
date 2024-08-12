import React, { useEffect } from 'react';
import postsData from './PostData';
import styled from 'styled-components';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/AuthService';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const ExitButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const UserId = styled.div`
  font-size: 14px;
  color: #666;
`;

const Stats = styled.div`
  margin-top: 20px;
`;

const PostListContainer = styled.div`
  margin-top: 20px;
`;

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(id);
      setUser(response.user);
    };
    fetchUser();
  }, [id]);


  if (!user) {
    return <div>用户不存在</div>;
  }

  const filteredPosts = user.posts && Array.isArray(user.posts)
    ? user.posts.map(postId => postsData.find(post => post.id === postId)).filter(post => post)
    : [];

  return (
    <ProfileContainer>
      <TopRow>
        <ExitButton onClick={() => window.history.back()}>退出</ExitButton>
        <div>用户详情</div>
      </TopRow>
      <UserDetails>
        <Avatar src={user.avatar} alt="User Avatar" />
        <div>
          <Username>{user.username}</Username>
          <UserId>id {user.id}</UserId>
        </div>
      </UserDetails>
      <Stats>
        <div>活跃度: {user.activity}</div>
      </Stats>
      <PostListContainer>
        {filteredPosts.map(post => (
            <Post key={post.id} post={post} />
        ))}
      </PostListContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;
