import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import TopNav from './components/layout/TopNav';
import BottomNav from './components/layout/BottomNav';
import Toast from './components/ui/Toast';
import InstallPrompt from './components/InstallPrompt';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ListScrapPage from './pages/ListScrapPage';
import BoutiquePage from './pages/BoutiquePage';
import BoutiqueDetailPage from './pages/BoutiqueDetailPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-[3px] border-cream-dark border-t-rust rounded-full animate-spin mx-auto mb-4" />
        <p className="font-serif text-lg text-rust">Stitched</p>
      </div>
    </div>
  );
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={isLoginPage ? 'min-h-screen bg-ivory' : 'min-h-screen bg-ivory'}>
      <div className={isLoginPage ? '' : 'app-container'}>
        {!isLoginPage && <TopNav />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/list" element={<ProtectedRoute><ListScrapPage /></ProtectedRoute>} />
            <Route path="/boutique" element={<ProtectedRoute><BoutiquePage /></ProtectedRoute>} />
            <Route path="/boutique/:id" element={<ProtectedRoute><BoutiqueDetailPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        {!isLoginPage && <BottomNav />}
        <Toast />
      </div>
      {!isLoginPage && <InstallPrompt />}
    </div>
  );
}
