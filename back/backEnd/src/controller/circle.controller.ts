// src/controller/circle.controller.ts
import { Controller, Get, Post, Body, Param } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/api/circles')
export class CircleController {
  @Post('/user')
  async getCircles(@Body() body: any) {
    const userId = body.userId;

    // 读取用户数据
    const usersPath = path.resolve(__dirname, '../data/user.data.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    // 查找对应userId的用户
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { success: false, message: 'User not found or user has no circles' };
    }
    console.log(user,user.circlesIds);

    // 读取兴趣圈数据
    const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
    const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));

    // 根据circleIds查找对应的兴趣圈
    if (!user.circlesIds) {
      return { success: true, circles: [] }
    }
    const userCircles = circles.filter((circle) => user.circlesIds.includes(circle.id));
    console.log(userCircles);

    return { success: true, circles: userCircles };
  }

  @Get('/')
  async getAllCircles() {
    const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
    const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
    // console.log(circles);
    return { success: true, circles };
  }

  @Get('/:circleId')
  async getCircle(@Param('circleId') circleId: number) {
    const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
    const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));

    const circle = circles.find((c) => c.id === circleId);

    return { success: true, circle };
  }
    
  @Post('/create')
  async createCircle(@Body() circleData: any) {
    const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
    const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));

    const newCircleId = circles.length > 0 ? Math.max(...circles.map(circle => circle.id)) + 1 : 1;
    const newCircle = { id: newCircleId, ...circleData };

    circles.push(newCircle);

    fs.writeFileSync(circlesPath, JSON.stringify(circles, null, 2), 'utf-8');

    // 更新用户数据中的circleIds
    const usersPath = path.resolve(__dirname, '../data/user.data.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const user = users.find((u) => u.id === circleData.creator_id);
    if (user) {
      if (!user.circleIds) {
        user.circleIds = [];
      }
      user.circleIds.push(newCircleId); // 确保新的circleId被添加到数组中
      // console.log(user.circleIds);
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
    }

    return { success: true, circle: newCircle };
  }

  @Post('/addCircle')
  async addCircle(@Body() data: { userId: number, circleId: number }) {
  const usersPath = path.resolve(__dirname, '../data/user.data.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

  const user = users.find((u) => u.id === data.userId);
  if (user) {
    if (!user.circlesIds) {
      user.circlesIds = [];
    }
    console.log(user, user.circlesIds);
    if (!user.circlesIds.includes(data.circleId)) {
      user.circlesIds.push(data.circleId);
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');

      const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
      const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
      const circle = circles.find((c) => c.id === data.circleId);
      if (circle) {
        if (!circle.members) {
          circle.members = [];
        }
        if (!circle.members.includes(data.userId)) {
          circle.members.push(data.userId);
          fs.writeFileSync(circlesPath, JSON.stringify(circles, null, 2), 'utf-8');
        }
      }

      return { success: true, circleId: data.circleId };
    } else {
      return { success: false, message: 'Circle already in user\'s circles' };
    }
  } else {
    return { success: false, message: 'User not found' };
  }
}

}
