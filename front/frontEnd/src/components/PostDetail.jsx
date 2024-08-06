import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PostDetailContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // 模拟数据获取
    const mockPost = {
      id: 1,
      title: '帖子1',
      content: '这是帖子1的内容',
      likes: 0,
      comments: [],
    };
    setPost(mockPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <PostDetailContainer>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        {post.comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
      <input type="text" placeholder="添加评论" />
    </PostDetailContainer>
  );
};

export default PostDetail;
