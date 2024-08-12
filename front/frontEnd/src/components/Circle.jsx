import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Circle.css';
import PostList from './PostList';
import { fetchCircle } from '../services/CircleService';

const Circle = () => {
  const { id } = useParams();
  const [circleInfo, setCircleInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCircle(id)
      .then(data => {
        console.log(data);
        setCircleInfo(data);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="circle-page">
      <div className="circle-header">
        {circleInfo.name ? <h1>{circleInfo.name}</h1> : <h1>Loading...</h1>}
        {circleInfo.description && <p>{circleInfo.description}</p>}
        <div className="circle-stats">
          <span>热度: {circleInfo.activity || 'N/A'}</span>
          <span>创建者: {circleInfo.creator_id || 'N/A'}</span>
          <span>活跃用户: {circleInfo.activeUsers || 'N/A'}</span>
        </div>
      </div>
      <PostList circleId={id} />
    </div>
  );
};

export default Circle;
