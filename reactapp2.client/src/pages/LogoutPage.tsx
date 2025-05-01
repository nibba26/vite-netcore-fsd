import { useEffect } from 'react';
import { logout } from '@/shared/api/authApi';
import { useNavigate } from 'react-router-dom';

export function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        logout().finally(() => {
            navigate('/login');
        });
    }, []);

    return <p>로그아웃 중...</p>;
}
