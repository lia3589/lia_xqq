import React, { useState } from 'react';
import styled from 'styled-components';

const AddPostContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理发帖逻辑
  };

  return (
    <AddPostContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="正文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">发帖</button>
      </form>
    </AddPostContainer>
  );
};

export default AddPost;
