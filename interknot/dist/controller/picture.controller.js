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
exports.ImageController = void 0;
// src/controller/image.controller.ts
const core_1 = require("@midwayjs/core");
const path_1 = require("path");
const fs = require("fs");
let ImageController = class ImageController {
    async getImage(imageName, ctx) {
        if (!imageName) {
            ctx.status = 400;
            ctx.body = 'Image name is required';
            return;
        }
        const imagePath = (0, path_1.join)(__dirname, '../../uploads', imageName);
        console.log(imagePath);
        if (fs.existsSync(imagePath)) {
            ctx.type = 'image/jpeg'; // 根据图片类型设置MIME类型
            ctx.body = fs.createReadStream(imagePath);
        }
        else {
            ctx.status = 404;
            ctx.body = 'Image not found';
        }
    }
};
__decorate([
    (0, core_1.Get)('/'),
    __param(0, (0, core_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getImage", null);
ImageController = __decorate([
    (0, core_1.Controller)('/image')
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvcGljdHVyZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFxQztBQUNyQyx5Q0FBd0Q7QUFFeEQsK0JBQTRCO0FBQzVCLHlCQUF5QjtBQUdsQixJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBRXBCLEFBQU4sS0FBSyxDQUFDLFFBQVEsQ0FBZ0IsU0FBaUIsRUFBRSxHQUFZO1FBQzNELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3BDLE9BQU87U0FDUjtRQUVELE1BQU0sU0FBUyxHQUFHLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2QixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDNUIsR0FBRyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxpQkFBaUI7WUFDMUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7U0FDOUI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWxCTztJQURMLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQztJQUNPLFdBQUEsSUFBQSxZQUFLLEVBQUMsTUFBTSxDQUFDLENBQUE7Ozs7K0NBaUI1QjtBQW5CVSxlQUFlO0lBRDNCLElBQUEsaUJBQVUsRUFBQyxRQUFRLENBQUM7R0FDUixlQUFlLENBb0IzQjtBQXBCWSwwQ0FBZSJ9