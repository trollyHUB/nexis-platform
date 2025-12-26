import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';

// Pages - Public
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Pages - Dashboard
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import BookmarksPage from './pages/BookmarksPage';

// Pages - Connect (Social)
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '60px' : '260px' }}
      >
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Auth pages layout
function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}

// Coming Soon placeholder
function ComingSoon({ title, icon, description }: { title: string; icon: string; description?: string }) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-4">{icon}</div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        <p className="text-text-secondary mt-2">{description || 'Эта страница в разработке'}</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes */}
      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes with dashboard layout */}
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        {/* Main Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Connect Module (Social) */}
        <Route path="/connect/feed" element={<FeedPage />} />
        <Route path="/connect/explore" element={<ExplorePage />} />
        <Route path="/connect/messages" element={<MessagesPage />} />
        <Route path="/connect/notifications" element={<NotificationsPage />} />

        {/* Legacy routes (redirect to new paths) */}
        <Route path="/feed" element={<Navigate to="/connect/feed" replace />} />
        <Route path="/explore" element={<Navigate to="/connect/explore" replace />} />
        <Route path="/messages" element={<Navigate to="/connect/messages" replace />} />
        <Route path="/notifications" element={<Navigate to="/connect/notifications" replace />} />

        {/* Account */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/security" element={<ComingSoon title="Безопасность" icon="🛡️" description="Настройки безопасности аккаунта" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
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

