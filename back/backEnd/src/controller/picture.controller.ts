// src/controller/image.controller.ts
import { Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { join } from 'path';
import * as fs from 'fs';

@Controller('/image')
export class ImageController {
  @Get('/')
  async getImage(@Query('name') imageName: string, ctx: Context) {
    if (!imageName) {
      ctx.status = 400;
      ctx.body = 'Image name is required';
      return;
    }

    const imagePath = join(__dirname, '../../uploads', imageName);
    console.log(imagePath);

    if (fs.existsSync(imagePath)) {
      ctx.type = 'image/jpeg'; // 根据图片类型设置MIME类型
      ctx.body = fs.createReadStream(imagePath);
    } else {
      ctx.status = 404;
      ctx.body = 'Image not found';
    }
  }
}

