//import { FC } from 'react'
//import { RouterProvider } from 'react-router-dom'

//import { router } from '@/pages/router'

//export const App: FC = () => {
//  return <RouterProvider router={router} />
//}


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/widgets/layout/MainLayout';
import AdminLayout from '@/widgets/layout/AdminLayout';
import BlankLayout from '@/widgets/layout/BlankLayout';

import MemberPage from '@/pages/admin/MemberPage';
import CategoryPage from '@/pages/admin/CategoryPage';
import AccessStatsPage from '@/pages/admin/statistics/AccessStatsPage';
import UsageStatsPage from '@/pages/admin/statistics/UsageStatsPage';

import  HomePage  from '@/pages/main/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { LogoutPage } from '@/pages/auth/LogoutPage';
import { ProfilePage } from '@/pages/ProfilePage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="statistics/access" element={<AccessStatsPage />} />
        <Route path="statistics/usage" element={<UsageStatsPage />} />
      </Route>
      <Route path="/login" element={<BlankLayout />}>
        <Route path="" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
