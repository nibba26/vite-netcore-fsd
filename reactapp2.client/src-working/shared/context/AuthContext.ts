import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../api/user';
import { login as loginApi, logout as logoutApi } from '../api/auth';

type User = { name: string; email: string };
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        try {
            const user = await fetchCurrentUser();
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    async function login(username: string, password: string) {
        await loginApi(username, password);
        await loadUser();
    }

    async function logout() {
        await logoutApi();
        setUser(null);
    }
    return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
    { children }
    </AuthContext.Provider>
  );
    
};