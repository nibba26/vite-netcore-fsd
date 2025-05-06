import { createBrowserRouter } from 'react-router-dom'

import { routes } from '@/shared/routes'

import { WelcomePage } from './welcome'
import { LoginPage } from '@/pages/auth/LoginPage';
import { LogoutPage } from '@/pages/auth/LogoutPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const router = createBrowserRouter([
    { path: routes.WELCOME, element: <WelcomePage />, },
    { path: '/login', element: <LoginPage /> },
    { path: '/logout', element: <LogoutPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '*', element: <LoginPage /> },
])
