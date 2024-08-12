// src/controller/user.controller.ts
import { Controller, Get, Post, Body, Inject, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Post('/login')
  async login(@Body() body: any) {
    const { username, password } = body;
    const userDataPath = path.resolve(__dirname, '../data/user.data.json');
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      return { success: true, message: '登录成功', user };
    } else {
      return { success: false, message: '用户名或密码错误' };
    }
  }

  // @Get('/:id')
  // async getPost(@Param('id') postId: number) {
  //   const postsPath = path.resolve(__dirname, '../data/post.data.json');
  //   const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

  //   const post = posts.find((p) => p.id === postId);
  //   if (post) {
  //     return { success: true, post };
  //   } else {
  //     return { success: false, message: 'Post not found' };
  //   }
  // }

  @Get('/:id')
  async getUser(@Param('id') userId: number) {
    const userDataPath = path.resolve(__dirname, '../data/user.data.json');
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

    const user = users.find((u: any) => u.id === userId);

    if (user) {
      return { success: true, message: '获取用户信息成功', user };
    } else {
      return { success: false, message: '用户不存在' };
    }
  }

  // @Get('/:id')
  // async getUserById(id: number) {
  //   const userDataPath = path.resolve(__dirname, '../data/user.data.json');
  //   const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

  //   const user = users.find((u: any) => u.id === id);

  //   if (user) {
  //     return { success: true, message: '获取用户信息成功', user };
  //   } else {
  //     return { success: false, message: '用户不存在' };
  //   }
  // }
}
