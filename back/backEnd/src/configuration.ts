import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as crossDomain from '@midwayjs/cross-domain';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
import * as upload from '@midwayjs/upload';
// import * as staticCache from 'koa-static-cache';

// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    crossDomain,
    orm,
    jwt,
    upload,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    // // 直接指定正确的静态文件目录路径
    // const staticDir = '..\\uploads';
    // console.log('Static directory:', staticDir);

    // // 使用 koa-static-cache 配置静态文件服务
    // this.app.use(staticCache({
    //   dir: staticDir,
    //   prefix: staticDir,
    //   maxAge: 365 * 24 * 60 * 60,
    //   gzip: true
    // }));

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
