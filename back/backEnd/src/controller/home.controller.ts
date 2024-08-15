import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/index.html')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
