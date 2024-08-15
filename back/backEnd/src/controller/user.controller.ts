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

  @Post('/register')
  async register(@Body() body: any) {
    const { username, password } = body;
    const userDataPath = path.resolve(__dirname, '../data/user.data.json');
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

    const existingUser = users.find((u: any) => u.username === username);
    if (existingUser) {
      return { success: false, message: '用户名已存在' };
    }

    const newUserId = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;

    const newUser = { id: newUserId, username, password,
      avatar: 'default-avatar1.jpg',
      posts: [],
      circlesActivity: {},
      circlesIds: [],
      messages: []
     };
    users.push(newUser);

    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2), 'utf-8');

    return { success: true, message: '注册成功', user: newUser };
  }

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
}
