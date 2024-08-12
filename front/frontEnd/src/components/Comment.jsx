import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../services/AuthService';

const Comment = ({ comment }) => {
  const [commenter, setCommenter] = useState(null);

  useEffect(() => {
    const fetchCommenter = async () => {
      try {
        const ct = await getUserById(comment.poster_id);
        setCommenter(ct.user);
      } catch (error) {
        console.error('Error fetching commenter:', error);
      }
    };
    fetchCommenter();
  }, [comment.poster_id]);

  const handleCommentLike = async (commentId) => {
    // 处理点赞逻辑
    console.log(`点赞评论 ID: ${commentId}`);
    // 例如，可以增加一个点赞请求到服务器并更新状态
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div key={comment.id} style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', width: '100%', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/profiles/${commenter ? commenter.id : ''}`}>
          <img src={commenter ? commenter.avatar : 'default-avatar.jpg'} alt="头像" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
        </Link>
        <Link to={`/profiles/${commenter ? commenter.id : ''}`} style={{ marginLeft: '10px' }}>
          {commenter ? commenter.username : '未知用户'}
        </Link>
      </div>
      <div style={{ marginTop: '5px' }}>
        <span>{formatDate(comment.time)}</span>
        <span style={{ marginLeft: '10px' }}>{comment.likes} 赞</span>
      </div>
      <div style={{ marginTop: '5px' }}>{typeof comment.content === 'string' ? comment.content : JSON.stringify(comment.content)}</div>
      <button onClick={() => handleCommentLike(comment.id)} style={{ marginTop: '5px' }}>点赞 ({comment.likes})</button>
    </div>
  );
};

export default Comment;
