import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/PostService';
import { getCircles } from '../services/CircleService';
import { UploadPicture } from '../services/PictureService'; // 导入UploadPicture方法
import './AddPost.css';
import { ImageUploader } from './ImageUploader'

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [circle, setCircle] = useState('');
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [circles, setCircles] = useState([]);
  const [filteredCircles, setFilteredCircles] = useState([]);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
    }
    fetchCircles();
  }, []);

  const fetchCircles = async () => {
    try {
      const circlesData = await getCircles();
      setCircles(circlesData);
      setFilteredCircles(circlesData);
    } catch (error) {
      console.error('Failed to fetch circles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(''); // 清空之前的警告信息

    if (!circle) {
      setWarning('未选择兴趣圈');
      return;
    }
    if (title.length < 5) {
      setWarning('标题不少于5个字');
      return;
    }
    if (!content) {
      setWarning('正文不能为空');
      return;
    }

    const selectedCircle = circles.find(c => c.name === circle);
    if (!selectedCircle) {
      setWarning('选择的兴趣圈无效');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('poster_id', parseInt(user.id, 10));
      formData.append('poster', user.username);
      formData.append('time', new Date().toISOString());
      formData.append('poster_avatar', user.avatar);
      formData.append('interest_circle', selectedCircle.name);
      formData.append('interest_circle_id', parseInt(selectedCircle.id, 10));

      formData.append('title', title);
      formData.append('content', content);
      formData.append('likes', 0);
      formData.append('comment', 0);
      formData.append('views', 0);
      formData.append('comments', []);

      const pictureUrls = [];
      for (const image of images) {
        const url = await UploadPicture(image);
        pictureUrls.push(url);
      }
      console.log(pictureUrls);
      formData.append('picture', JSON.stringify(pictureUrls)); 
      await createPost(formData);
      navigate('/homepage');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="add-post-container">
      <button onClick={() => navigate(-1)} className="back-button">返回</button>
      <h1>发布帖子</h1>
      {warning && <div className="alert alert-danger">{warning}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <i className="fas fa-user"></i> 选择兴趣圈
          </label>
          <select
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            className="form-control"
          >
            <option value="">选择兴趣圈</option>
            {filteredCircles.map(circle => (
              <option key={circle.id} value={circle.name}>{circle.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            <i className="fas fa-heading"></i> 标题
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>
            <i className="fas fa-align-left"></i> 正文
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>
            <i className="fas fa-image"></i> 图片
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          <ImageUploader images={images} setImages={setImages} />
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`preview-${index}`} className="preview-image" />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-paper-plane"></i> Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
