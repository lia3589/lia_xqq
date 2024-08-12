import axios from 'axios';

const API_URL = 'http://localhost:7001/';


export const UploadPicture = async (picture) => {
    try {
        console.log('picture',picture);
        const response = await axios.post(`${API_URL}upload`, picture);
        return response.url;
    } catch (error) {
        console.log(error);
    }
}