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
exports.PostController = void 0;
const core_1 = require("@midwayjs/core");
const fs = require("fs");
const path = require("path");
let PostController = class PostController {
    async createPost(postData) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const usersPath = path.resolve(__dirname, '../data/user.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
            const newPostId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
            const newPost = { id: newPostId, ...postData };
            console.log(newPost);
            if (this.ctx.files && this.ctx.files.length > 0) {
                newPost.picture = this.ctx.files[0];
            }
            posts.push(newPost);
            const user = users.find(u => u.id === postData.poster_id);
            if (user) {
                if (!user.posts) {
                    user.posts = [];
                }
                user.posts.push(newPostId);
                fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
            }
            fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
            return { success: true, post: newPost };
        }
        catch (error) {
            return { success: false, message: 'Failed to create post' };
        }
    }
    async getPosts() {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            // console.log(posts);
            return { success: true, posts };
        }
        catch (error) {
            return { success: false, message: 'Failed to get posts' };
        }
    }
    async getCirclePosts(circleId) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const circlePosts = posts.filter((post) => post.interest_circle_id === circleId);
            return { success: true, circlePosts };
        }
        catch (error) {
            return { success: false, message: 'Failed to get circle posts' };
        }
    }
    async getPost(postId) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const post = posts.find((p) => p.id === postId);
            if (post) {
                return { success: true, post };
            }
            else {
                return { success: false, message: 'Post not found' };
            }
        }
        catch (error) {
            return { success: false, message: 'Failed to get post' };
        }
    }
    async likePost(postId) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const post = posts.find((p) => p.id === postId);
            if (post) {
                post.likes += 1;
                post.liked = true;
                fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
                return { success: true, post };
            }
            else {
                return { success: false, message: 'Post not found' };
            }
        }
        catch (error) {
            return { success: false, message: 'Failed to like post' };
        }
    }
    async unlikePost(postId) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const post = posts.find((p) => p.id === postId);
            if (post) {
                post.likes -= 1;
                post.liked = false;
                fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
                return { success: true, post };
            }
            else {
                return { success: false, message: 'Post not found' };
            }
        }
        catch (error) {
            return { success: false, message: 'Failed to unlike post' };
        }
    }
    async addComment(postId, commentData) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const post = posts.find((p) => p.id === postId);
            if (post) {
                const newComment = {
                    id: post.comments.length + 1,
                    ...commentData,
                    time: new Date().toISOString(),
                    likes: 0,
                };
                post.comments.push(newComment);
                fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
                return { success: true, comment: newComment };
            }
            else {
                return { success: false, message: 'Post not found' };
            }
        }
        catch (error) {
            return { success: false, message: 'Failed to add comment' };
        }
    }
    async likeComment(postId, commentId) {
        try {
            const postsPath = path.resolve(__dirname, '../data/post.data.json');
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
            const post = posts.find((p) => p.id === postId);
            if (post) {
                const comment = post.comments.find((c) => c.id === commentId);
                if (comment) {
                    comment.likes += 1;
                    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
                    return { success: true, comment };
                }
                else {
                    return { success: false, message: 'Comment not found' };
                }
            }
            else {
                return { success: false, message: 'Post not found' };
            }
        }
        catch (error) {
            return { success: false, message: 'Failed to like comment' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], PostController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Post)('/'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, core_1.Get)('/circle/:circleId'),
    __param(0, (0, core_1.Param)('circleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getCirclePosts", null);
__decorate([
    (0, core_1.Get)('/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, core_1.Post)('/:id/like'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
__decorate([
    (0, core_1.Post)('/:id/unlike'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "unlikePost", null);
__decorate([
    (0, core_1.Post)('/:id/comment'),
    __param(0, (0, core_1.Param)('id')),
    __param(1, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addComment", null);
__decorate([
    (0, core_1.Post)('/:postId/comments/:commentId/like'),
    __param(0, (0, core_1.Param)('postId')),
    __param(1, (0, core_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likeComment", null);
PostController = __decorate([
    (0, core_1.Controller)('/posts')
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvcG9zdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE0RTtBQUU1RSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBR3RCLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFLbkIsQUFBTixLQUFLLENBQUMsVUFBVSxDQUFTLFFBQWE7UUFDcEMsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7WUFDcEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVwRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTlELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDcEIsSUFBSSxJQUFJLENBQUMsR0FB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