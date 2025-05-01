import api from '../lib/axios';


interface ApiResponse<T> {
    data: T;
    success: boolean;
}

interface LoginResult {
    userId: string;
    name: string;
}


export async function login(username: string, password: string): Promise<LoginResult> {
    const res = await api.post<ApiResponse<LoginResult>>('/auth/login', { username, password });
    return res.data.data; // �����ϰ� T�� ��ȯ
}

export async function logout() {
    await api.post('/auth/logout');
}