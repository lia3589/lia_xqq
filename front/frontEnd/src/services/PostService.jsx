// src/services/PostService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:7001/posts';

export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.posts;
  } catch (error) {
    console.error('Get posts failed:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    console.error('Create post failed:', error);
    throw error;
  }
};
