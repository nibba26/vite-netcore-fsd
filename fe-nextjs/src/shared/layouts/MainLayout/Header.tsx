'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/shared/api/authApi';
import { UserInfo } from '@/shared/type/types';


const Header = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        setError('로그인이 필요합니다.');
        router.push('/login');
      });
  }, [router]);

  if (!user) return <p>로딩 중...</p>;

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-6 justify-end">
        <div className="text-sm text-gray-700 font-medium">User ID: {user.userId}</div>
        <div className="text-sm text-gray-600">Role: {user.role}</div>
        <div className="text-sm text-gray-500">Expires: {user.expires}</div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => router.push('/logout')}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
  );
};
export default Header;
