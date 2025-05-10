import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/shared/api/authApi';
import { UserInfo } from '@/shared/api/types';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const [_user, setUser] = useState<UserInfo | null>(null);
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
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default MainLayout;
