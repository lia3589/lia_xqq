import { MidwayConfig } from '@midwayjs/core';
import { tmpdir } from 'os';
import path = require('path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1723187005082_9970',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: '1723187005082_9970',
    expiresIn: '1d',
  },
  upload: {
    mode: 'file',
    fileSize: '50mb',
    tmpdir: path.join(tmpdir(), 'uploads'),
    cleanTimeout: 5 * 60 * 1000,
  }
} as MidwayConfig;
