import { Context } from '@midwayjs/web';
export declare class UploadController {
    ctx: Context;
    uploadImage(files: any): Promise<{
        success: boolean;
        message: string;
        url?: undefined;
    } | {
        success: boolean;
        url: string;
        message?: undefined;
    }>;
    updateAvatar(files: any, userId: number): Promise<{
        success: boolean;
        message: string;
        url?: undefined;
    } | {
        success: boolean;
        url: string;
        message?: undefined;
    }>;
}
