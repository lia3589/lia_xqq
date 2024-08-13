import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Circle.css';
import PostList from './PostList';
import { fetchCircle } from '../services/CircleService';
import { getUserById } from '../services/AuthService';

const Circle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [circleInfo, setCircleInfo] = useState({});
  const [membersInfo, setMembersInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCircle(id)
      .then(data => {
        console.log(data);
        setCircleInfo(data);
        // Fetch members info
        Promise.all(data.members.map(memberId => getUserById(memberId)))
          .then(membersData => {
            setMembersInfo(membersData);
          })
          .catch(err => {
            console.error(err);
            setError(err);
          });
      })
      .catch(err => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleExit = () => {
    navigate('/homepage');
  };

  const renderMembers = () => {
    if (!membersInfo || membersInfo.length === 0) {
      return <div>No members available</div>;
    }
    return (
      <div className="circle-members-grid">
        {membersInfo.map(member => (
          <div key={member.user.id} className="member-block" onClick={() => navigate(`/profiles/${member.user.id}`)}>
            <img src={member.user.avatar} alt={member.user.username} className="member-avatar" />
            <span className="member-name">{member.user.username}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="circle-page">
      <div className="circle-header">
        <button className="exit-button" onClick={handleExit}>退出</button>
        <h1>{circleInfo.name || 'Loading...'}</h1>
        <p>{circleInfo.description || ''}</p>
        <span>热度: {circleInfo.activity}</span>
        <span>创建者: {circleInfo.creator_id}</span>
        <span>兴趣圈成员:</span>
        {renderMembers()}
      </div>
      <PostList circleId={id} />
    </div>
  );
};

export default Circle;
