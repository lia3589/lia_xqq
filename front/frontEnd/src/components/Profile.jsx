import React, { useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/AuthService';
import { getPostById } from '../services/PostService'; // 引入PostService
import { fetchUserCircle } from '../services/CircleService'; // 引入CircleService

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

const CirclesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const CircleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const CircleName = styled.div`
  font-weight: bold;
`;

const CircleMembers = styled.div`
  font-size: 14px;
  color: #666;
`;

const PostListContainer = styled.div`
  margin-top: 20px;
`;

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [circles, setCircles] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(id);
      setUser(response.user);
      console.log(response.user);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user && user.posts && Array.isArray(user.posts)) {
      const fetchPosts = async () => {
        const postPromises = user.posts.map(postId => getPostById(postId));
        const fetchedPosts = await Promise.all(postPromises);
        console.log(fetchedPosts)
        // 过滤掉没有 id 属性的帖子
        const validPosts = fetchedPosts.filter(post => post.post && post.post.id);
        setPosts(validPosts);
      };
      fetchPosts();
    }
  }, [user]);

  useEffect(() => {
    const fetchCircles = async () => {
      const response = await fetchUserCircle(parseInt(id));
      console.log(response);
      setCircles(response);
    };
    fetchCircles();
  }, [id]);

  if (!user) {
    return <div>用户不存在</div>;
  }

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
      <CirclesContainer>
        <div>{user.username}的兴趣圈</div>
        {circles.length === 0 ? (
          <div>:(这位老哥还没有加入兴趣圈</div>
        ) : (
          circles.map(circle => (
            <CircleItem key={circle.id} onClick={() => navigate(`/circle/${circle.id}`)}>
              <CircleName>{circle.name}</CircleName>
              <CircleMembers>{circle.members.length} 人</CircleMembers>
            </CircleItem>
          ))
        )}
      </CirclesContainer>
      <PostListContainer>
        {posts.length === 0 ? (
          <div>这位老哥，还没发帖</div>
        ) : (
          posts.map(post => (
            <Post key={post.post.id} post={post.post} />
          ))
        )}
      </PostListContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;
