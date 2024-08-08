import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postsData from '../components/PostData';
import './PostDetail.css';
import { UserContext } from '../App';
import userData from '../components/UserData';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = postsData.find(p => p.id === parseInt(id));
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(post.likes || 0);
  const { user } = React.useContext(UserContext);

  if (!post) {
    return <div>帖子不存在</div>;
  }

  const Comment = ({ comment }) => {
    const commenter = getUserById(comment.poster_id);
    return (
      <div key={comment.id} style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', width: '100%', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={commenter ? commenter.avatar : '/src/assets/default-avatar1.jpg'} alt="头像" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
        <span style={{ marginLeft: '10px' }}>{commenter ? commenter.username : '未知用户'}</span>
      </div>
      <div style={{ marginTop: '5px' }}>
        <span>{comment.time}</span>
        <span style={{ marginLeft: '10px' }}>{comment.likes} 赞</span>
      </div>
      <div style={{ marginTop: '5px' }}>{typeof comment.content === 'string' ? comment.content : JSON.stringify(comment.content)}</div>
      <button onClick={() => handleCommentLike(comment.id)} style={{ marginTop: '5px' }}>点赞 ({comment.likes})</button>
    </div>
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        poster_id: user.id, // 假设当前用户已登录
        content: newComment,
        time: new Date().toISOString(),
        likes: 0,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    }));
  };

  const getUserById = (userId) => {
    return userData.find(u => u.id === userId);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <button onClick={() => navigate(-1)}>退出</button>
        <span>帖子详情</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', width: '100%' }}>
        <img src={post.poster_avatar} alt="头像" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
        <span style={{ marginLeft: '10px' }}>{post.poster}</span>
        <span style={{ marginLeft: 'auto' }}>{post.interest_circle}</span>
      </div>
      <div style={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>
        <span>{post.time}</span>
        <span style={{ marginLeft: '10px' }}>{post.activity}</span>
      </div>
      <div style={{ fontWeight: 'bold', marginTop: '10px', width: '100%', textAlign: 'left' }}>{post.title}</div>
      <div style={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>{post.content}</div>
      {post.picture && post.picture.length > 0 && (
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          {post.picture.map((img, index) => (
            <img key={index} src={img} alt="图片" style={{ borderRadius: '10px', width: '100px', height: '100px', margin: '5px' }} />
          ))}
        </div>
      )}
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', width: '100%' }}>
        <button onClick={handleLike}>点赞 ({likes})</button>
        <button style={{ marginLeft: '10px' }}>评论 ({comments.length})</button>
      </div>
      {comments.map((comment) => { return <Comment key={comment.id} comment={comment} />})}

      <div style={{ position: 'fixed', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', padding: '10px', background: 'white' }}>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="输入回复内容"
            required
            style={{ flexGrow: 1, marginRight: '10px', padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px' }}>发送</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
