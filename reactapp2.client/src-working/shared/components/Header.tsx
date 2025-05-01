import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-lg font-bold">My App</h1>
            {user ? (
                <div className="flex items-center gap-4">
                    <span>{user.name}</span>
                    <button onClick={logout} className="bg-red-600 px-2 py-1 rounded">
                        Logout
                    </button>
                </div>
            ) : (
                <span>Not logged in</span>
            )}
        </header>
    );
}
