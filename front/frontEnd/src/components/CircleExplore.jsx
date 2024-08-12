import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CircleExplore.css';

import { getCircles, addCircle } from '../services/CircleService';

const CircleExplore = () => {
  const [circles, setCircles] = useState([]);
  const [filteredCircles, setFilteredCircles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddCircle = (id) => {
    addCircle(id).then(() => {
      // 可以在这里处理加入成功后的逻辑
      alert('加入成功');
    });
  };

  const renderCircle = (circle) => (
    <div key={circle.id} className="circle-item">
      <Link to={`/circle/${circle.id}`}>{circle.name}</Link>
      <button onClick={() => handleAddCircle(circle.id)}>加入</button>
    </div>
  );

  const recommendedCircles = circles.slice(0, 4);

  return (
    <div className="circle-explore">
      <div className="circle-header">
        <input
          type="text"
          placeholder="搜索兴趣圈"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to="/circle/create" className="create-button">创建</Link>
      </div>
      <div className="circle-section">
        <h2>推荐</h2>
        <div className="circle-list">
          {recommendedCircles.map(renderCircle)}
        </div>
      </div>
      <div className="circle-section">
        <h2>全部</h2>
        <div className="circle-list">
          {filteredCircles.map(renderCircle)}
        </div>
      </div>
    </div>
  );
};

export default CircleExplore;
