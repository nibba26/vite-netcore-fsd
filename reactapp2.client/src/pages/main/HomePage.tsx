import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/shared/api/authApi';
import { UserInfo } from '@/shared/api/types';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        setError('로그인이 필요합니다.');
        navigate('/login');
      });
  }, []);

  if (!user) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>내 정보</h2>
      <p>User ID: {user.userId}</p>
      <p>Role: {user.role}</p>
      <p>Expires: {user.expires}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
