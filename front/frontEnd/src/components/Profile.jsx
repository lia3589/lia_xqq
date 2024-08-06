import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Profile = ({ userAvatar }) => {
  // 默认头像URL
  const defaultAvatar = 'https://example.com/default-avatar.png';

  return (
    <ProfileContainer>
      <h1>个人界面</h1>
      {/* 显示头像，如果没有提供用户头像，则显示默认头像 */}
      <Avatar src={userAvatar ? userAvatar : defaultAvatar} alt="用户头像" />
      {/* 个人界面内容 */}
    </ProfileContainer>
  );
};

export default Profile;
