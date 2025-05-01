import api from '../lib/axios';
import { ApiResponse } from '../types/apiResopnse';
import { CurrentUser } from '../types/currentUser';


export async function fetchCurrentUser() {
    const res = await api.get<ApiResponse<CurrentUser>>('/user/getcurrentuser');
    return res.data.data;
}