import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Accueil from './pages/Accueil';
import LeGroupe from './pages/LeGroupe';
import Investir from './pages/Investir';
import Expertises from './pages/Expertises';
import Contact from './pages/Contact';


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

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/accueil" replace />} />
        <Route path="accueil" element={<Accueil />} />
        <Route path="le-groupe" element={<LeGroupe />} />
        <Route path="investir" element={<Investir />} />
        <Route path="expertises" element={<Expertises />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/accueil" replace />} />
    </Routes>
  );
}
