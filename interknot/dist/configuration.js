"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const koa = require("@midwayjs/koa");
const validate = require("@midwayjs/validate");
const info = require("@midwayjs/info");
const path_1 = require("path");
const crossDomain = require("@midwayjs/cross-domain");
const orm = require("@midwayjs/orm");
const jwt = require("@midwayjs/jwt");
const upload = require("@midwayjs/upload");
const staticCache = require("koa-static");
const staticFile = require("@midwayjs/static-file");
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
const report_middleware_1 = require("./middleware/report.middleware");
let MainConfiguration = class MainConfiguration {
    async onReady() {
        // add middleware
        this.app.useMiddleware([report_middleware_1.ReportMiddleware]);
        this.app.use(staticCache((0, path_1.join)(__dirname, '../uploads')));
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
};
__decorate([
    (0, core_1.App)('koa'),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [
            koa,
            validate,
            crossDomain,
            orm,
            jwt,
            upload,
            staticFile,
            {
                component: info,
                enabledEnvironment: ['local'],
            },
        ],
        importConfigs: [(0, path_1.join)(__dirname, './config')],
    })
], MainConfiguration);
exports.MainConfiguration = MainConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvRDtBQUNwRCxxQ0FBcUM7QUFDckMsK0NBQStDO0FBQy9DLHVDQUF1QztBQUN2QywrQkFBNEI7QUFDNUIsc0RBQXNEO0FBQ3RELHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsMkNBQTJDO0FBQzNDLDBDQUEwQztBQUMxQyxvREFBb0Q7QUFFcEQsZ0VBQWdFO0FBQ2hFLDZEQUE2RDtBQUM3RCxzRUFBa0U7QUFrQjNELElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWlCO0lBSTVCLEtBQUssQ0FBQyxPQUFPO1FBQ1gsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsb0NBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELHFCQUFxQjtRQUNyQixtQ0FBbUM7UUFDbkMsK0NBQStDO1FBRS9DLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0Isb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsZUFBZTtRQUNmLE9BQU87UUFFUCxhQUFhO1FBQ2IsNERBQTREO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBdkJDO0lBQUMsSUFBQSxVQUFHLEVBQUMsS0FBSyxDQUFDOzs4Q0FDVTtBQUZWLGlCQUFpQjtJQWhCN0IsSUFBQSxvQkFBYSxFQUFDO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsR0FBRztZQUNILFFBQVE7WUFDUixXQUFXO1lBQ1gsR0FBRztZQUNILEdBQUc7WUFDSCxNQUFNO1lBQ04sVUFBVTtZQUNWO2dCQUNFLFNBQVMsRUFBRSxJQUFJO2dCQUNmLGtCQUFrQixFQUFFLENBQUMsT0FBTyxDQUFDO2FBQzlCO1NBQ0Y7UUFDRCxhQUFhLEVBQUUsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDN0MsQ0FBQztHQUNXLGlCQUFpQixDQXdCN0I7QUF4QlksOENBQWlCIn0=