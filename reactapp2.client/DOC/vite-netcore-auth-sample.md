# Vite + React + Axios + .NET Core JWT 인증 예제

## 📁 프로젝트 구조
```
src/
├── api/
│   ├── auth.ts
│   └── user.ts
├── components/
│   ├── Header.tsx
│   └── PrivateRoute.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   └── axios.ts
├── pages/
│   ├── LoginPage.tsx
│   └── HomePage.tsx
├── App.tsx
├── main.tsx
```

## 🔧 각 파일 내용

### `src/lib/axios.ts`
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default api;
```

### `src/api/auth.ts`
```ts
import api from '../lib/axios';

export async function login(username: string, password: string) {
  const res = await api.post('/auth/login', { username, password });
  return res.data;
}

export async function logout() {
  await api.post('/auth/logout');
}
```

### `src/api/user.ts`
```ts
import api from '../lib/axios';

export async function fetchCurrentUser() {
  const res = await api.get('/user/getcurrentuser');
  return res.data;
}
```

### `src/context/AuthContext.tsx`
```tsx
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
  login: async () => {},
  logout: async () => {},
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
      {children}
    </AuthContext.Provider>
  );
};
```

### `src/hooks/useAuth.ts`
```ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
```

### `src/components/Header.tsx`
```tsx
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
```

### `src/components/PrivateRoute.tsx`
```tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

### `src/pages/LoginPage.tsx`
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
```

### `src/pages/HomePage.tsx`
```tsx
export default function HomePage() {
  return <div className="p-6">Welcome to the protected home page!</div>;
}
```

### `src/App.tsx`
```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### `src/main.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 📦 설치해야 할 패키지
```bash
npm install axios react-router-dom
```

## 🛠 CORS 설정 예시 (.NET 백엔드)
```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:5173")
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

---