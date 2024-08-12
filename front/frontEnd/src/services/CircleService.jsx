import axios from 'axios';

const API_URL = 'http://localhost:7001';

export const fetchUserCircle = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/circles/user`, {
      "userId": userId
    });
    // console.log(response);
    return response.data.circles;
  } catch (error) {
    console.error('Failed to fetch circle:', error);
    throw error;
  }
};

export const fetchCircle = async (circleId) => {
  try {
    const response = await axios.get(`${API_URL}/api/circles/${circleId}`);
    console.log(response);
    return response.data.circle;
  } catch (error) {
    console.error('Failed to fetch circle:', error);
    throw error;
  }
};

export const createCircle = async (circle) => {
  try {
    const formDataObject = {};
    for (let [key, value] of circle.entries()) {
      if (key === 'creator_id' || key === 'activity') {
        formDataObject[key] = Number(value);
      } else {
        formDataObject[key] = value;
      }
    }
    const response = await axios.post(`${API_URL}/api/circles/create`, formDataObject);
    return response.data;
  } catch (error) {
    console.error('Failed to create circle:', error);
    throw error;
  }
};

export const getCircles = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/circles`);
    return response.data.circles;
  } catch (error) {
    console.error('Failed to get circles:', error);
    throw error;
  }
};

export const addCircle = async (userId, circleId) => {
  try {
    const response = await axios.post(`${API_URL}/api/circles/addCircle`, {
      "userId": userId,
      "circleId": circleId
    });
    return response;
  } catch (error) {
    console.error('Failed to add circle:', error);
    throw error;
  }
};
