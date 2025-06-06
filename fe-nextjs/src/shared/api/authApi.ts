import axiosInstance from './axios';
import { LoginRequest, LoginResponse, UserInfo, Member } from '../type/types';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await axiosInstance.post('/auth/logout');
}

export async function getCurrentUser(): Promise<UserInfo> {
  const res = await axiosInstance.get<UserInfo>('/auth/getMyInfo', {
    withCredentials: true, // ⚠️ override (이미 설정돼 있으면 생략 가능)
  });
  return res.data;
}


export async function getMembers(): Promise<Member[]> {
  const res = await axiosInstance.get<Member[]>('/members');
  return res.data;
}
