// src/services/PostService.jsx
import axios from 'axios';
import { UploadPicture } from './PictureService'; // 假设 PictureService 位于同一目录

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

export const getCirclePosts = async (circleId) => {
  try {
    const response = await axios.get(`${API_URL}/circle/${circleId}`);
    return response.data.circlePosts;
  } catch (error) {
    console.error('Get circle posts failed:', error);
    throw error;
  }
};

export const createPost = async (formData) => {
  try {
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      if (key === 'poster_id' || key === 'interest_circle_id' || key === 'likes' || key === 'comment' || key === 'views') {
        formDataObject[key] = Number(value);
      } else if (key === 'picture' || key === 'comments') {
        try {
          if (value==='') {
            formDataObject[key] = [];
          } else {
            formDataObject[key] = JSON.parse(value);
          }
        } catch (e) {
          console.error(`Failed to parse ${key} as JSON`, e);
          formDataObject[key] = value;
        }
      } else {
        formDataObject[key] = value;
      }
    }

    const response = await axios.post(API_URL, formDataObject);
    return response.data;
  } catch (error) {
    console.error('Create post failed:', error);
    throw error;
  }
};


export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Like post failed:', error);
    throw error;
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/unlike`);
    return response.data;
  } catch (error) {
    console.error('Unlike post failed:', error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Get post by id failed:', error);
    throw error;
  }
};

export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/comment`, commentData);
    return response.data;
  } catch (error) {
    console.error('Add comment failed:', error);
    throw error;
  }
};
