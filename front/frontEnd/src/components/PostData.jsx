const postsData = [
    {
        id: 1,
        poster: '我要成为原神高手',
        time: '2024-2-31',
        poster_avatar: '/src/assets/default-avatar3.jpg',
        interest_circle: '闲置出售',
        title: '优质价格出售自制头像',
        content: '楼主是大学生,课余时间学习PS制作了一些头像给粉丝宝宝们,数量有限,只给有缘人,5r/张,先到先得',
        picture: [
            '/src/assets/default-avatar1.jpg',
           '/src/assets/default-avatar2.jpg',
           '/src/assets/default-avatar3.jpg',
           '/src/assets/default-avatar4.jpg',
           '/src/assets/default-avatar5.jpg',
        ],
        likes: 0,
        comment: 0,
        comments: [
            {
                id: 2,
                poster_id : 0,
                content: '绳网并非法外之地',
                time: '2024-2-31',
                likes: 100,
            },
            {
                id: 3,
                poster_id : 1,
                content:'2楼说的对',
                time: '2024-2-31',
                likes: 1,
            },
            {
                id: 4,
                poster_id : 2,
                content: '3楼说的对',
                time: '2024-2-31',
                likes: 0,
            }
        ],
    },
    {
        id: 2,
        poster: 'admin',
        time: '2024-2-31',
        poster_avatar: '/src/assets/default-avatar2.jpg',
        interest_circle: 'circle2',
        title: '帖子2',
        content: '这是帖子2的内容',
        picture: [
            '/src/assets/default-avatar1.jpg',
           '/src/assets/default-avatar2.jpg',
        ],
        likes: 0,
        comment: 0,
        comments: [
        ],
    },
    {
        id: 3,
        poster: 'admin',
        time: '2024-2-31',
        poster_avatar: '/src/assets/default-avatar3.jpg',
        interest_circle: 'circle3',
        title: '帖子3',
        content: '这是帖子3的内容',
        picture: [
            '/src/assets/default-avatar1.jpg',
           '/src/assets/default-avatar2.jpg',
           '/src/assets/default-avatar3.jpg',
        ],
        likes: 0,
        comment: 0,
        comments: [
        ],
    },
    {
        id: 4,
        poster: 'user4',
        time: '2024-2-31',
        poster_avatar: '/src/assets/default-avatar4.jpg',
        interest_circle: 'circle4',
        title: '帖子4',
        content: '这是帖子4的内容',
        picture: [
            '/src/assets/default-avatar1.jpg',
           '/src/assets/default-avatar2.jpg',
           '/src/assets/default-avatar3.jpg',
           '/src/assets/default-avatar4.jpg',
           '/src/assets/default-avatar5.jpg',
        ],
        likes: 0,
        comment: 0,
        comments: [
        ],
    },
    {
        id: 5,
        poster: 'user5',
        time: '2024-2-31',
        poster_avatar: '/src/assets/default-avatar5.jpg',
        interest_circle: 'circle5',
        title: '帖子5',
        content: '这是帖子5的内容',
        picture: [
            '/src/assets/default-avatar1.jpg',
           '/src/assets/default-avatar2.jpg',
           '/src/assets/default-avatar3.jpg',
           '/src/assets/default-avatar4.jpg',
           '/src/assets/default-avatar5.jpg',
        ],
        likes: 0,
        comment: 0,
        comments: [
        ],
    },
];

export default postsData;
