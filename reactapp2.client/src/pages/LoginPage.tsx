import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/shared/api/authApi';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ username, password });
            if (res.success) {
                navigate('/profile');
            } else {
                setError('로그인 실패');
            }
        } catch (err) {
            setError('서버 오류');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                <button type="submit">로그인</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
