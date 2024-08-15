export declare class UserService {
    private users;
    findUser(username: string, password: string): Promise<{
        username: string;
        password: string;
    }>;
    addUser(username: string, password: string): Promise<void>;
    updateUser(username: string, newPassword: string): Promise<boolean>;
}
