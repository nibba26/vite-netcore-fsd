export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token?: string; // 토큰을 body로 내려주는 경우 (선택)
    success: boolean;
}

export interface UserInfo {
    userId: string;
    role: string;
    expires: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
}
