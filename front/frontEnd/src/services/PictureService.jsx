import axios from 'axios';

const API_URL = 'http://localhost:7001/';

export const UploadPicture = async (picture) => {
    if (!picture) {
        throw new Error('缺少图片文件');
    }

    // 假设 picture 是一个 File 对象
    if (!(picture instanceof File)) {
        throw new Error('上传的不是一个有效的文件');
    }

    // 验证文件类型是否为图片
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(picture.type)) {
        throw new Error('不支持的文件类型');
    }

    try {
        console.log('picture', picture);
        const formData = new FormData();
        formData.append('file', picture);

        const response = await axios.post(`${API_URL}upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.url;
    } catch (error) {
        console.log(error);
        throw new Error('图片上传失败');
    }
}
