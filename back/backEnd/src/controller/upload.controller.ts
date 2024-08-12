import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/upload')
export class UploadController {

  @Inject()
  ctx: Context;

  @Post('/')
  async upload(@Files() files, @Fields() fields) {
    return {
      files,
      fields
    }
  }
}
