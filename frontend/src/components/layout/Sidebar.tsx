import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Bell,
  Settings,
  FolderKanban,
  BarChart3,
  LogOut,
  ChevronLeft,
  Compass,
  Newspaper,
  Cloud,
  Code2,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { path: '/feed', icon: Newspaper, label: 'Лента' },
  { path: '/explore', icon: Compass, label: 'Поиск' },
  { path: '/messages', icon: MessageSquare, label: 'Сообщения', badge: 3 },
  { path: '/notifications', icon: Bell, label: 'Уведомления', badge: 5 },
];

const workspaceItems = [
  { path: '/workspace', icon: FolderKanban, label: 'Проекты' },
  { path: '/cloud', icon: Cloud, label: 'Облако' },
  { path: '/analytics', icon: BarChart3, label: 'Аналитика' },
];

const devItems = [
  { path: '/developer', icon: Code2, label: 'Разработчикам' },
];

const userItems = [
  { path: '/profile', icon: User, label: 'Профиль' },
  { path: '/settings', icon: Settings, label: 'Настройки' },
];

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-surface border-r border-border flex flex-col transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-text-primary tracking-wide">NEXIS</span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/dashboard" className="mx-auto">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          </Link>
        )}
        {!isCollapsed && (
          <button
            onClick={handleToggle}
            className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* User Info (collapsed = avatar only) */}
      {user && (
        <div className={`p-4 border-b border-border ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-semibold">
                {user.username[0].toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-medium text-text-primary truncate">{user.fullName || user.username}</p>
                <p className="text-xs text-text-muted truncate">@{user.username}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {/* Main Menu */}
        {!isCollapsed && <p className="px-3 py-2 text-xs text-text-muted uppercase tracking-wider">Меню</p>}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              {item.badge && (
                <span
                  className={`bg-accent text-white text-xs font-bold rounded-full ${
                    isCollapsed ? 'absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center' : 'ml-auto px-2 py-0.5'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Workspace */}
        <div className="my-3 border-t border-border" />
        {!isCollapsed && <p className="px-3 py-2 text-xs text-text-muted uppercase tracking-wider">Рабочее пространство</p>}
        <div className="space-y-1">
          {workspaceItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Developer */}
        <div className="my-3 border-t border-border" />
        {!isCollapsed && <p className="px-3 py-2 text-xs text-text-muted uppercase tracking-wider">Разработка</p>}
        <div className="space-y-1">
          {devItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* User */}
        <div className="my-3 border-t border-border" />
        {!isCollapsed && <p className="px-3 py-2 text-xs text-text-muted uppercase tracking-wider">Аккаунт</p>}
        <div className="space-y-1">
          {userItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-border">
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors w-full ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Выйти' : undefined}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Выйти</span>}
        </button>
      </div>
    </aside>
  );
}

