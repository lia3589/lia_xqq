// src/controller/user.controller.ts
import { Controller, Post, Body, Inject } from '@midwayjs/core';
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
}
