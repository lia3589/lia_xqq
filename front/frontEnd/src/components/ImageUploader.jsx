import React, { useState } from 'react';
import axios from 'axios';

export const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('请选择一个文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:7001/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
            f
        }
      });
      console.log('上传成功', response.data);
    } catch (error) {
      console.error('上传失败', error);
    }
  };

  return (
    <div>
      <h2>文件上传</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>上传</button>
    </div>
  );
};

export default ImageUploader;
