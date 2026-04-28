import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Accueil from './pages/Accueil';
import LeGroupe from './pages/LeGroupe';
import Investir from './pages/Investir';
import Expertises from './pages/Expertises';
import Actualites from './pages/Actualites';
import ActualiteDetail from './pages/ActualiteDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
function AdminGuard({ children }) {
  const token = localStorage.getItem('smts_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  const [splashDone, setSplashDone] = useState(() => {
    try {
      return sessionStorage.getItem('smts_splash_seen') === '1';
    } catch {
      return true;
    }
  });

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/accueil" replace />} />
        <Route path="accueil" element={<Accueil />} />
        <Route path="le-groupe" element={<LeGroupe />} />
        <Route path="investir" element={<Investir />} />
        <Route path="expertises" element={<Expertises />} />
        <Route path="actualites" element={<Actualites />} />
        <Route path="actualites/:id" element={<ActualiteDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/accueil" replace />} />
    </Routes>
  );
}
