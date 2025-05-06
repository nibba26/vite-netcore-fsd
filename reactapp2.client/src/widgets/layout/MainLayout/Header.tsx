import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/shared/api/authApi';
import { UserInfo } from '@/shared/api/types';


const Header = () => {
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
    <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold text-gray-800">React FSD Sample</span>
        </Link>
      </div>

      {/* Right: User Info & Logout */}
      <div className="flex items-center space-x-6">
        <div className="text-sm text-gray-700">
          <div><span className="font-medium">User ID:</span> {user.userId}</div>
          <div><span className="font-medium">Role:</span> {user.role}</div>
          <div><span className="font-medium">Expires:</span> {user.expires}</div>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => navigate('/logout')}>Logout</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
  );
};
export default Header;
