export declare class CircleController {
    getCircles(body: any): Promise<{
        success: boolean;
        message: string;
        circles?: undefined;
    } | {
        success: boolean;
        circles: any;
        message?: undefined;
    }>;
    getAllCircles(): Promise<{
        success: boolean;
        circles: any;
    }>;
    getCircle(circleId: number): Promise<{
        success: boolean;
        circle: any;
    }>;
    createCircle(circleData: any): Promise<{
        success: boolean;
        circle: any;
    }>;
    addCircle(data: {
        userId: number;
        circleId: number;
    }): Promise<{
        success: boolean;
        circleId: number;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        circleId?: undefined;
    }>;
    changeImage(data: {
        circleId: number;
        imageUrl: string;
    }): Promise<{
        success: boolean;
        message: string;
        circle: any;
    } | {
        success: boolean;
        message: string;
        circle?: undefined;
    }>;
}
