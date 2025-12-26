import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';

// Layout components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Loading spinner
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
    </div>
  );
}

// Protected route wrapper
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

// Public route (redirect if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
}

// Main layout with sidebar and header
function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

// Auth pages layout (clean, no sidebar)
function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />

      {/* Auth routes */}
      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes with dashboard layout */}
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Workspace */}
        <Route path="/workspace" element={<ComingSoon title="Проекты" icon="📁" />} />
        <Route path="/cloud" element={<ComingSoon title="Облако" icon="☁️" />} />
        <Route path="/analytics" element={<ComingSoon title="Аналитика" icon="📊" />} />

        {/* Developer */}
        <Route path="/developer" element={<ComingSoon title="Разработчикам" icon="🔧" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// Coming Soon placeholder
function ComingSoon({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        <p className="text-text-secondary mt-2">Эта страница в разработке</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
