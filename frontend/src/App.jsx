import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageClients from './pages/admin/ManageClients';
import ManageMessages from './pages/admin/ManageMessages';
import ManageClientLogos from "./pages/admin/ManageClientLogos";
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppButton />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin panel (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="messages" element={<ManageMessages />} />
          <Route
    path="client-logos"
    element={<ManageClientLogos />}
  />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <div style={{ padding: '120px 24px', textAlign: 'center' }}>
              <span className="coord-tag">404</span>
              <h1 style={{ marginTop: 12 }}>Page not found</h1>
              <p style={{ color: 'var(--steel-soft)' }}>
                The page you're looking for doesn't exist. <a href="/" style={{ color: 'var(--steel)', textDecoration: 'underline' }}>Go home</a>.
              </p>
            </div>
          </PublicLayout>
        }
      />
    </Routes>
  );
}

export default App;
