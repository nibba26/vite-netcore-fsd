import { useEffect, useState } from 'react';
import { getMembers } from '@/shared/api/authApi';
import { Member } from '@/shared/api/types';


const HomePage = () => {
  const [error, setError] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch(() => {
        setError('데이터가 없습니다.');
      });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition duration-300"
          >
            <div className="text-lg font-bold text-gray-800 mb-2">{member.name}</div>
            <div className="text-sm text-gray-500 mb-1">ID: {member.id}</div>
            <div className="text-sm text-gray-600">Email: {member.email}</div>
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HomePage;
