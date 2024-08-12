import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';
import { UserContext } from '../App';
import { Link } from'react-router-dom';
import { getPostById, likePost, addComment } from '../services/PostService';
import Comment from './Comment';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPostById(id);
      if (postData.success) {
        setPost(postData.post);
        setComments(postData.post.comments || []);
        setLikes(postData.post.likes || 0);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>帖子不存在</div>;
  }

  // const Comment = ({ comment }) => {
  //   const commenter = getUserById(comment.poster_id);
  //   return (
  //     <div key={comment.id} style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', width: '100%', textAlign: 'left' }}>
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <img src={commenter ? commenter.avatar : commenter.avatar} alt="头像" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
  //         <span style={{ marginLeft: '10px' }}>{commenter ? commenter.username : '未知用户'}</span>
  //       </div>
  //       <div style={{ marginTop: '5px' }}>
  //         <span>{comment.time}</span>
  //         <span style={{ marginLeft: '10px' }}>{comment.likes} 赞</span>
  //       </div>
  //       <div style={{ marginTop: '5px' }}>{typeof comment.content === 'string' ? comment.content : JSON.stringify(comment.content)}</div>
  //       <button onClick={() => handleCommentLike(comment.id)} style={{ marginTop: '5px' }}>点赞 ({comment.likes})</button>
  //     </div>
  //   );
  // };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        poster_id: user.id, // 假设当前用户已登录
        content: newComment,
      };
      const response = await addComment(id, newCommentObj);
      if (response.success) {
        setComments([...comments, response.comment]);
        setNewComment('');
      }
    }
  };

  const handleLike = async () => {
    const response = await likePost(id);
    if (response.success) {
      setLikes(response.post.likes);
    }
  };

  // const handleCommentLike = (commentId) => {
  //   setComments(comments.map(comment => {
  //     if (comment.id === commentId) {
  //       return { ...comment, likes: comment.likes + 1 };
  //     }
  //     return comment;
  //   }));
  // };

  return (
    <div style={{width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',height: '80%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <button onClick={() => navigate(-1)}>退出</button>
        <span>帖子详情</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', width: '100%' }}>
        <Link to={`/profiles/${post.poster_id}`}>
          <img src={post.poster_avatar} alt="头像" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
        </Link>
        <Link to={`/profiles/${post.poster_id}`}>
          <span style={{ marginLeft: '10px' }}>{post.poster}</span>
        </Link>
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
      {comments.map((comment, index) => { return <Comment key={index} comment={comment} />})}

      <div style={{ position: 'fixed', bottom: '10px', width: '80%', display: 'flex', justifyContent: 'center', padding: '10px', background: 'white' }}>
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
