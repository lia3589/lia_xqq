import { Context } from '@midwayjs/koa';
export declare class UserController {
    ctx: Context;
    login(body: any): Promise<{
        success: boolean;
        message: string;
        user: any;
    } | {
        success: boolean;
        message: string;
        user?: undefined;
    }>;
    register(body: any): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        success: boolean;
        message: string;
        user: {
            id: number;
            username: any;
            password: any;
            avatar: string;
            posts: any[];
            circlesActivity: {};
            circlesIds: any[];
            messages: any[];
        };
    }>;
    getUser(userId: number): Promise<{
        success: boolean;
        message: string;
        user: any;
    } | {
        success: boolean;
        message: string;
        user?: undefined;
    }>;
}
