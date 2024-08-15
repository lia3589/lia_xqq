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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// src/controller/user.controller.ts
const core_1 = require("@midwayjs/core");
const fs = require("fs");
const path = require("path");
let UserController = class UserController {
    async login(body) {
        const { username, password } = body;
        const userDataPath = path.resolve(__dirname, '../data/user.data.json');
        const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            return { success: true, message: '登录成功', user };
        }
        else {
            return { success: false, message: '用户名或密码错误' };
        }
    }
    async register(body) {
        const { username, password } = body;
        const userDataPath = path.resolve(__dirname, '../data/user.data.json');
        const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
        const existingUser = users.find((u) => u.username === username);
        if (existingUser) {
            return { success: false, message: '用户名已存在' };
        }
        const newUserId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
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
    async getUser(userId) {
        const userDataPath = path.resolve(__dirname, '../data/user.data.json');
        const users = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
        const user = users.find((u) => u.id === userId);
        if (user) {
            return { success: true, message: '获取用户信息成功', user };
        }
        else {
            return { success: false, message: '用户不存在' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], UserController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Post)('/login'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('/register'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, core_1.Get)('/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    (0, core_1.Controller)('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUFvQztBQUNwQyx5Q0FBNEU7QUFFNUUseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUd0QixJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBS25CLEFBQU4sS0FBSyxDQUFDLEtBQUssQ0FBUyxJQUFTO1FBQzNCLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDdkUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7UUFFeEYsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ2pEO2FBQU07WUFDTCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsUUFBUSxDQUFTLElBQVM7UUFDOUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDcEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxD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