import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserCircle } from '../services/CircleService';

const SidebarContainer = styled.div`
  width: 20%;
  background-color: #f4f4f4;
  padding: 20px;
  padding-bottom: 60px;
  position: fixed;
  top: 0;
  left: 0;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfileSection = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  h3 {
    color: #333;
  }
`;

const ButtonContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CircleImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  text-align: center; /* 文字居中 */
`;

const Sidebar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [circles, setCircles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);

      // 获取用户的兴趣圈
      const getCircles = async () => {
        try {
          const circleMessage = await fetchUserCircle(parsedUser.user.id);
          setCircles(circleMessage);
          // console.log('Circles:', circleMessage);
        } catch (error) {
          console.error('Failed to fetch circles:', error);
        }
      };

      getCircles();
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleExploreCircle = () => {
    navigate('/circle/explore');
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        <Link to={"/profiles/" + user?.id}>
          <CircleImage src={user?.avatar} alt="个人头像" />
          <h3>{user?.username}</h3>
        </Link>
      </ProfileSection>
      <ButtonContainer>
        <StyledButton>首页</StyledButton>
        {circles.map((circle) => (
          <StyledButton onClick={() => navigate('/circle/' + circle.id)} key={circle.id}>{circle.name}</StyledButton>
        ))}
        <StyledButton onClick={handleExploreCircle}>发现</StyledButton>
      </ButtonContainer>
      <BottomSection>
        <button onClick={handleLogout}>登出</button>
        <button>消息</button>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
