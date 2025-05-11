'use client';

import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'; // ✅ Next.js 훅
import { UserInfo } from '@/shared/type/types';
import { getCurrentUser } from '@/shared/api/authApi';

export default function Home() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState('');
  //const navigate = useNavigate();
  const router = useRouter(); // ✅ useNavigate → useRouter

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        setError('로그인이 필요합니다.');
        //navigate('/login');
        router.push('/login'); // ✅ navigate → router.push
      });
  }, [router]);

  if (!user) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>내 정보</h2>
      <p>User ID: {user.userId}</p>
      <p>Role: {user.role}</p>
      <p>Expires: {user.expires}</p>
      {/*<button onClick={() => navigate('/logout')}>로그아웃</button>*/}
      <button onClick={() => router.push('/logout')}>로그아웃</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
