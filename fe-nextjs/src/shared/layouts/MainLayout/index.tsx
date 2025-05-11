'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/shared/api/authApi';
import { UserInfo } from '@/shared/type/types';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {

  const [_user, setUser] = useState<UserInfo | null>(null);
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

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
