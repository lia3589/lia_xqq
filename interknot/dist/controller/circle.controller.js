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
exports.CircleController = void 0;
// src/controller/circle.controller.ts
const core_1 = require("@midwayjs/core");
const fs = require("fs");
const path = require("path");
let CircleController = class CircleController {
    async getCircles(body) {
        const userId = body.userId;
        // console.log(userId);
        // 读取用户数据
        const usersPath = path.resolve(__dirname, '../data/user.data.json');
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        // console.log(users);
        // 查找对应userId的用户
        const user = users.find((u) => u.id === userId);
        // console.log(user);
        if (!user) {
            return { success: false, message: 'User not found or user has no circles' };
        }
        // console.log(user,user.circlesIds);
        // 读取兴趣圈数据
        const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
        const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
        // 根据circlesIds查找对应的兴趣圈
        if (!user.circlesIds) {
            return { success: true, circles: [] };
        }
        const userCircles = circles.filter((circle) => user.circlesIds.includes(circle.id));
        // console.log(userCircles);
        return { success: true, circles: userCircles };
    }
    async getAllCircles() {
        const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
        const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
        // console.log(circles);
        return { success: true, circles };
    }
    async getCircle(circleId) {
        const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
        const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
        const circle = circles.find((c) => c.id === circleId);
        return { success: true, circle };
    }
    async createCircle(circleData) {
        const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
        const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
        const newCircleId = circles.length > 0 ? Math.max(...circles.map(circle => circle.id)) + 1 : 1;
        const newCircle = { id: newCircleId, ...circleData };
        circles.push(newCircle);
        fs.writeFileSync(circlesPath, JSON.stringify(circles, null, 2), 'utf-8');
        // 更新用户数据中的circlesIds
        const usersPath = path.resolve(__dirname, '../data/user.data.json');
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        const user = users.find((u) => u.id === circleData.creator_id);
        if (user) {
            if (!user.circlesIds) {
                user.circlesIds = [];
            }
            user.circlesIds.push(newCircleId); // 确保新的circleId被添加到数组中
            // console.log(user.circlesIds);
            fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
        }
        return { success: true, circle: newCircle };
    }
    async addCircle(data) {
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
            }
            else {
                return { success: false, message: 'Circle already in user\'s circles' };
            }
        }
        else {
            return { success: false, message: 'User not found' };
        }
    }
    async changeImage(data) {
        const circlesPath = path.resolve(__dirname, '../data/circles.data.json');
        const circles = JSON.parse(fs.readFileSync(circlesPath, 'utf-8'));
        const circle = circles.find((c) => c.id === data.circleId);
        if (circle) {
            circle.image = data.imageUrl; // 更新circle的image字段
            fs.writeFileSync(circlesPath, JSON.stringify(circles, null, 2), 'utf-8');
            return { success: true, message: 'Image updated successfully', circle };
        }
        else {
            return { success: false, message: 'Circle not found' };
        }
    }
};
__decorate([
    (0, core_1.Post)('/user'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "getCircles", null);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "getAllCircles", null);
__decorate([
    (0, core_1.Get)('/:circleId'),
    __param(0, (0, core_1.Param)('circleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "getCircle", null);
__decorate([
    (0, core_1.Post)('/create'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "createCircle", null);
__decorate([
    (0, core_1.Post)('/addCircle'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "addCircle", null);
__decorate([
    (0, core_1.Post)('/changeImage'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CircleController.prototype, "changeImage", null);
CircleController = __decorate([
    (0, core_1.Controller)('/api/circles')
], CircleController);
exports.CircleController = CircleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9jaXJjbGUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMseUNBQW9FO0FBQ3BFLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHdEIsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFFckIsQUFBTixLQUFLLENBQUMsVUFBVSxDQUFTLElBQVM7UUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQix1QkFBdUI7UUFFdkIsU0FBUztRQUNULE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlELHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQztRQUNoRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxDQUFDO1NBQzdFO1FBQ0QscUNBQXFDO1FBRXJDLFVBQVU7UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVsRSx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFBO1NBQ3RDO1FBQ0QsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEYsNEJBQTRCO1FBRTVCLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRSx3QkFBd0I7UUFDeEIsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFNBQVMsQ0FBb0IsUUFBZ0I7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQztRQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsWUFBWSxDQUFTLFVBQWU7UUFDeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsTUFBTSxTQUFTLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFFckQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QixFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekUscUJBQXFCO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7WUFDekQsZ0NBQWdDO1lBQ2hDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsU0FBUyxDQUFTLElBQTBDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTlELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUVyRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLE1BQU0sRUFBRTtvQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7cUJBQ3JCO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUMxRTtpQkFDRjtnQkFFRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25EO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO2FBQ3pFO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFdBQVcsQ0FBUyxJQUE0QztRQUNwRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVsRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQjtZQUNqRCxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3pFO2FBQU07WUFDTCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztTQUN4RDtJQUNILENBQUM7Q0FFQSxDQUFBO0FBaklPO0lBREwsSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDO0lBQ0ksV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOzs7O2tEQTRCdkI7QUFHSztJQURMLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQzs7OztxREFNUjtBQUdLO0lBREwsSUFBQSxVQUFHLEVBQUMsWUFBWSxDQUFDO0lBQ0QsV0FBQSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQTs7OztpREFPakM7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLFNBQVMsQ0FBQztJQUNJLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7OztvREF5QnpCO0FBR0s7SUFETCxJQUFBLFdBQUksRUFBQyxZQUFZLENBQUM7SUFDRixXQUFBLElBQUEsV0FBSSxHQUFFLENBQUE7Ozs7aURBa0N4QjtBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsY0FBYyxDQUFDO0lBQ0YsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOzs7O21EQWF4QjtBQWpJWSxnQkFBZ0I7SUFENUIsSUFBQSxpQkFBVSxFQUFDLGNBQWMsQ0FBQztHQUNkLGdCQUFnQixDQW1JNUI7QUFuSVksNENBQWdCIn0=