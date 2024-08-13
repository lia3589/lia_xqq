import React, { useEffect, useState } from 'react';
import './CreateCircle.css';
import { createCircle } from '../services/CircleService';
import { useNavigate, Link } from 'react-router-dom';

const CreateCircle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
    } else {
      navigate('/');
    }
  }, []);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('creator_id', user.id)
    formData.append('members', [user.id])
    formData.append('activeUser',[])
    formData.append('activity',0)

    createCircle(formData).then(response => {
      console.log(response);
      if (response.success) {
        navigate('/homepage');
      } else {
        alert('兴趣圈创建失败');
      }
    });
  };

  return (
    <div className="create-circle">
      <Link to="/CircleExplore" className="back-button">返回</Link>
      <h1>创建新的兴趣圈</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>兴趣圈名字:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>描述:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label>上传图片:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">创建</button>
      </form>
    </div>
  );
};

export default CreateCircle;
