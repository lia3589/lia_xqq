import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../App';

const SidebarContainer = styled.div`
  width: 20%;
  background-color: #f4f4f4;
  padding: 20px;
  padding-right: 0px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 0px;
`;

const CircleImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Sidebar = () => {

  const user = useContext(UserContext);

  return (
    <SidebarContainer>
      <Link to={'/profile/' + user.id}>
        <CircleImage 
          src= {user.avatar} 
          alt="个人头像" 
        />
        <h5>{user.username}</h5>
      </Link>
      <ButtonContainer>
        <button>推荐</button>
        <button>闲置出售</button>
        <button>兴趣圈2</button>
        <button>+</button>
      </ButtonContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
