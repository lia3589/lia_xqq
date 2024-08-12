import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CircleExplore.css';
import { getCircles, addCircle } from '../services/CircleService';
import { getUserById } from '../services/AuthService';

const CircleExplore = () => {
  const [circles, setCircles] = useState([]);
  const [filteredCircles, setFilteredCircles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userCirclesIds, setUserCirclesIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))?.user;
    if (user) {
      getUserById(user.id)
        .then(data => {
          setUserCirclesIds(data.user.circlesIds || []);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  useEffect(() => {
    getCircles()
      .then(data => {
        setCircles(data);
        setFilteredCircles(data);
      })
      .catch(error => {
        console.error('Error fetching circles:', error);
      });
  }, []);

  useEffect(() => {
    if (Array.isArray(circles) && circles.length > 0) {
      const results = circles.filter(circle =>
        circle && circle.name && circle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCircles(results);
    }
  }, [searchTerm, circles]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleAddCircle = (circleId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      addCircle(user.id, circleId)
        .then(() => {
          setUserCirclesIds(prevIds => [...prevIds, circleId]);
          navigate(`/circle/${circleId}`);
        })
        .catch(error => {
          console.error('Error adding circle:', error);
        });
    }
  };

  const renderCircle = (circle) => {
    const isJoined = userCirclesIds.includes(circle.id);
    return (
      <div key={circle.id} className="circle-item">
        <Link to={`/circle/${circle.id}`}><b>{circle.name}</b></Link>
        <div>活跃度: {circle.activity}</div>
        <div>人数: {circle.members.length}</div>
        <button onClick={() => handleAddCircle(circle.id)} disabled={isJoined}>
          {isJoined ? '已加入' : '加入'}
        </button>
      </div>
    );
  };

  const recommendedCircles = circles.slice(0, 4);

  return (
    <div className="circle-explore">
      <div className="circle-header">
        <Link to="/" className="back-button">返回</Link>
        <input
          type="text"
          placeholder="搜索兴趣圈"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to="/circle/create" className="create-button">创建</Link>
      </div>
      {searchTerm === '' && (
        <div className="circle-section">
          <h2>推荐</h2>
          <div className="circle-list">
            {recommendedCircles.map(renderCircle)}
          </div>
        </div>
      )}
      <div className="circle-section">
        <h2>全部</h2>
        <div className="circle-list">
          {filteredCircles.length > 0 ? (
            filteredCircles.map(renderCircle)
          ) : (
            <div>还没有这个兴趣圈，快去创建吧！</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleExplore;
