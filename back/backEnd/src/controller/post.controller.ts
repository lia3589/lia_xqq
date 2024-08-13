import { Controller, Get, Post, Body, Inject, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/posts')
export class PostController {
  @Inject()
  ctx: Context;

  @Post('/')
  async createPost(@Body() postData: any) {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const usersPath = path.resolve(__dirname, '../data/user.data.json');

      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

      const newPostId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
      const newPost = { id: newPostId, ...postData };

      if (this.ctx.files && this.ctx.files.length > 0) {
        newPost.picture = this.ctx.files[0];
      }
      console.log(this.ctx.files)

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
    } catch (error) {
      return { success: false, message: 'Failed to create post' };
    }
  }

  @Get('/')
  async getPosts() {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
      // console.log(posts);
      return { success: true, posts };
    } catch (error) {
      return { success: false, message: 'Failed to get posts' };
    }
  }

  @Get('/circle/:circleId')
  async getCirclePosts(@Param('circleId') circleId: number) {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

      const circlePosts = posts.filter((post) => post.interest_circle_id === circleId);

      return { success: true, circlePosts };
    } catch (error) {
      return { success: false, message: 'Failed to get circle posts' };
    }
  }

  @Get('/:id')
  async getPost(@Param('id') postId: number) {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

      const post = posts.find((p) => p.id === postId);
      if (post) {
        return { success: true, post };
      } else {
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to get post' };
    }
  }

  @Post('/:id/like')
  async likePost(@Param('id') postId: number) {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

      const post = posts.find((p) => p.id === postId);
      if (post) {
        post.likes += 1;
        post.liked = true;
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
        return { success: true, post };
      } else {
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to like post' };
    }
  }

  @Post('/:id/unlike')
  async unlikePost(@Param('id') postId: number) {
    try {
      const postsPath = path.resolve(__dirname, '../data/post.data.json');
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

      const post = posts.find((p) => p.id === postId);
      if (post) {
        post.likes -= 1;
        post.liked = false;
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
        return { success: true, post };
      } else {
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to unlike post' };
    }
  }

  @Post('/:id/comment')
  async addComment(@Param('id') postId: number, @Body() commentData: any) {
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
      } else {
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to add comment' };
    }
  }

  @Post('/:postId/comments/:commentId/like')
  async likeComment(@Param('postId') postId: number, @Param('commentId') commentId: number) {
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
        } else {
          return { success: false, message: 'Comment not found' };
        }
      } else {
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to like comment' };
    }
  }
}
