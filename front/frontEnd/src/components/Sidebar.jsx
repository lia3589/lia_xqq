import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../App';
import { Outlet, useNavigate } from 'react-router-dom';

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

const Sidebar = ({onLogout}) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        <Link to={'/profile/' + user.id}>
          <CircleImage 
            src= {user.avatar} 
            alt="个人头像" 
          />
          <h5>{user.username}</h5>
        </Link>
      </ProfileSection>
      <ButtonContainer>
        <StyledButton>推荐</StyledButton>
        <StyledButton>闲置出售</StyledButton>
        <StyledButton>兴趣圈2</StyledButton>
        <StyledButton>+</StyledButton>
      </ButtonContainer>
      <BottomSection>
        <button onClick={handleLogout}>登出</button>
        <button>消息</button>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
