import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
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
        console.log(postData.post)
        setComments(postData.post.comments || []);
        setLikes(postData.post.likes || 0);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>帖子不存在</div>;
  }

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)}>退出</button>
        <span>帖子详情</span>
      </div>
      <div style={styles.postHeader}>
        <Link to={`/profiles/${post.poster_id}`}>
          <img src={post.poster_avatar} alt="头像" style={styles.avatar} />
        </Link>
        <Link to={`/profiles/${post.poster_id}`}>
          <span style={styles.posterName}>{post.poster}</span>
        </Link>
        <span style={styles.interestCircle}>{post.interest_circle}</span>
      </div>
      <div style={styles.postInfo}>
        <span>{post.time}</span>
        <span style={styles.activity}>{post.activity}</span>
      </div>
      <div style={styles.postTitle}>{post.title}</div>
      <div style={styles.postContent}>{post.content}</div>
      {post.picture && post.picture.length > 0 && (
        <div style={styles.picturesContainer}>
          {post.picture.map((img, index) => (
            <img key={index} src={img} alt="图片" style={styles.picture} />
          ))}
        </div>
      )}
      <div style={styles.actions}>
        <button onClick={handleLike}>点赞 ({likes})</button>
        <button style={styles.commentButton}>评论 ({comments.length})</button>
      </div>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}

      <div style={styles.commentFormContainer}>
        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="输入回复内容"
            required
            style={styles.commentInput}
          />
          <button type="submit" style={styles.submitButton}>发送</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    max_width: '800px',
    min_width: '600px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
  },
  avatar: {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
  },
  posterName: {
    marginLeft: '10px',
  },
  interestCircle: {
    marginLeft: 'auto',
  },
  postInfo: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'left',
  },
  activity: {
    marginLeft: '10px',
  },
  postTitle: {
    fontWeight: 'bold',
    marginTop: '10px',
    width: '100%',
    textAlign: 'left',
  },
  postContent: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'left',
  },
  picturesContainer: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  picture: {
    borderRadius: '10px',
    width: '100px',
    height: '100px',
    margin: '5px',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  commentButton: {
    marginLeft: '10px',
  },
  commentFormContainer: {
    position: 'fixed',
    bottom: '10px',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    background: 'white',
  },
  commentForm: {
    display: 'flex',
    width: '100%',
  },
  commentInput: {
    flexGrow: 1,
    marginRight: '10px',
    padding: '10px',
  },
  submitButton: {
    padding: '10px',
  },
};

export default PostDetail;
