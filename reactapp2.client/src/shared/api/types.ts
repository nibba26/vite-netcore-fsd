export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token?: string; // ��ū�� body�� �����ִ� ��� (����)
    success: boolean;
}

export interface UserInfo {
    userId: string;
    role: string;
    expires: string;
}
