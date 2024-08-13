import React, { useEffect, useState } from 'react';
import { createCircle, changeCircleImage } from '../services/CircleService';
import { useNavigate, Link } from 'react-router-dom';
import { UploadPicture } from '../services/PictureService';

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
  }, [navigate]);

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
    if (!name || !description) {
      alert('请填写所有必填字段');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);  
    formData.append('creator_id', user.id);
    formData.append('members', [user.id]);
    formData.append('image', image)
    formData.append('activeUser', []);
    formData.append('activity', 0);

    createCircle(formData).then(response => {
      if (response.success) {
          navigate('/homepage');
      } else {
        alert('兴趣圈创建失败');
      }
    }).catch(() => {
      alert('兴趣圈创建失败');
    });
  };

  const styles = {
    createCircle: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    h1: {
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    fileInput: {
      padding: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    backButton: {
      position: 'absolute',
      top: '5%',
      left: '10%',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    backButtonHover: {
      color: 'gray',
    },
  };

  return (
    <div style={styles.createCircle} className="create-circle">
      <Link to="/circle/explore" style={styles.backButton} className="back-button">返回</Link>
      <h1 style={styles.h1}>创建新的兴趣圈</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup} className="form-group">
          <label style={styles.label}>兴趣圈名字:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup} className="form-group">
          <label style={styles.label}>描述:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup} className="form-group">
          <label style={styles.label}>上传图片:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            style={styles.fileInput}
          />
        </div>
        <button type="submit" style={styles.button}>创建</button>
      </form>
    </div>
  );
};

export default CreateCircle;
