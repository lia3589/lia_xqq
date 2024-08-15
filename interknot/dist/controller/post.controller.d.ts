import { Context } from '@midwayjs/koa';
export declare class PostController {
    ctx: Context;
    createPost(postData: any): Promise<{
        success: boolean;
        post: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        post?: undefined;
    }>;
    getPosts(): Promise<{
        success: boolean;
        posts: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        posts?: undefined;
    }>;
    getCirclePosts(circleId: number): Promise<{
        success: boolean;
        circlePosts: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        circlePosts?: undefined;
    }>;
    getPost(postId: number): Promise<{
        success: boolean;
        post: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        post?: undefined;
    }>;
    likePost(postId: number): Promise<{
        success: boolean;
        post: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        post?: undefined;
    }>;
    unlikePost(postId: number): Promise<{
        success: boolean;
        post: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        post?: undefined;
    }>;
    addComment(postId: number, commentData: any): Promise<{
        success: boolean;
        comment: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        comment?: undefined;
    }>;
    likeComment(postId: number, commentId: number): Promise<{
        success: boolean;
        comment: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        comment?: undefined;
    }>;
}
