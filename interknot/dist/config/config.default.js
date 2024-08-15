"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("@midwayjs/upload");
const os_1 = require("os");
const path_1 = require("path");
exports.default = {
    // use for cookie sign key, should change to your own and keep security
    keys: '1723187005082_9970',
    koa: {
        port: 7001,
    },
    jwt: {
        secret: '1723187005082_9970',
        expiresIn: '1d',
    },
    typeorm: {
        datasources: {
            default: {
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123',
                database: 'lia_xqq',
                synchronize: true,
                logging: false,
                entities: ['**/entity/*.entity{.ts,.js}'],
            },
        }
    },
    staticFile: {
        dirs: {
            default: {
                prefix: '/',
                dir: './interknotfrontend',
            },
            another: {
                prefix: '/public',
                dir: (0, path_1.join)(__dirname, '../../uploads'),
            }
        }
    },
    upload: {
        // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
        mode: 'file',
        // fileSize: string, 最大上传文件大小，默认为 10mb
        fileSize: '10mb',
        // whitelist: string[]，文件扩展名白名单
        whitelist: upload_1.uploadWhiteList.filter(ext => ext !== '.pdf'),
        // tmpdir: string，上传的文件临时存储路径
        tmpdir: (0, path_1.join)((0, os_1.tmpdir)(), 'midway-upload-files'),
        // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
        cleanTimeout: 5 * 60 * 1000,
        // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
        base64: false,
        // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
        match: /\/upload/,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQW1EO0FBQ25ELDJCQUE0QjtBQUM1QiwrQkFBNEI7QUFFNUIsa0JBQWU7SUFDYix1RUFBdUU7SUFDdkUsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQzFDO1NBQ0Y7S0FDRjtJQUNELFVBQVUsRUFBRztRQUNYLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsR0FBRztnQkFDWCxHQUFHLEVBQUUscUJBQXFCO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixHQUFHLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQzthQUN0QztTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixxREFBcUQ7UUFDckQsSUFBSSxFQUFFLE1BQU07UUFDWixzQ0FBc0M7UUFDdEMsUUFBUSxFQUFFLE1BQU07UUFDaEIsK0JBQStCO1FBQy9CLFNBQVMsRUFBRSx3QkFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUM7UUFDeEQsNkJBQTZCO1FBQzdCLE1BQU0sRUFBRSxJQUFBLFdBQUksRUFBQyxJQUFBLFdBQU0sR0FBRSxFQUFFLHFCQUFxQixDQUFDO1FBQzdDLG9EQUFvRDtRQUNwRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO1FBQzNCLDBEQUEwRDtRQUMxRCxNQUFNLEVBQUUsS0FBSztRQUNiLHlDQUF5QztRQUN6QyxLQUFLLEVBQUUsVUFBVTtLQUNsQjtDQUNjLENBQUMifQ==