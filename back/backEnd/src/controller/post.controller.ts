// src/controller/post.controller.ts
import { Controller, Get, Post, Body, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';
import { Upload, UploadOptions } from '@midwayjs/upload';

@Controller('/posts')
export class PostController {
    @Inject()
    ctx: Context;

    @Post('/')
    @Upload()
    async createPost(@Body() postData: any, @UploadOptions() file: any) {
        const postsPath = path.resolve(__dirname, '../data/post.data.json');
        const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

        // 生成新的帖子ID
        const newPostId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
        const newPost = { id: newPostId, ...postData };

        // 处理上传的图片
        if (file) {
            const filePath = path.join(__dirname, '../public/uploads', file.filename);
            fs.renameSync(file.data, filePath);
            newPost.image = `/public/uploads/${file.filename}`;
        }

        // 将新帖子添加到帖子列表中
        posts.push(newPost);

        // 将更新后的帖子列表写回到post.data.json文件中
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');

        return { success: true, post: newPost };
    }

    @Get('/')
    async getPosts() {
        const postsPath = path.resolve(__dirname, '../data/post.data.json');
        const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
        return { success: true, posts };
    }
}
