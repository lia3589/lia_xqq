import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { GlobalStyles } from '../styles/globalStyles.jsx';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 20%;
`;

const ContentContainer = styled.div`
  width: 80%;
  position: relative;
  padding: 0; /* 去除上侧的距离 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 帖子水平上占满右侧 */
`;

const FloatingButton = styled.button`
  position: fixed; /* 固定在窗口右下角 */
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
  color: white;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function HomePage({ onLogout }) {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate('/posts/new');
  };

  return (
    <HomePageContainer>
      <GlobalStyles />
      <SidebarContainer>
        <Sidebar onLogout={onLogout} />
      </SidebarContainer>
      <ContentContainer>
        <Outlet />
        <FloatingButton onClick={handleAddPost}>+</FloatingButton>
      </ContentContainer>
    </HomePageContainer>
  );
}

export default HomePage;
