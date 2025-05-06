// widgets/layout/AdminLayout/index.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AdminLayout = () => (
  <>
    <Header />
    <main style={{ padding: '1rem' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AdminLayout;
