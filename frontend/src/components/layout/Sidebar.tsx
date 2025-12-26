import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
  Newspaper,
  Shield,
  Bookmark,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

interface MenuItem {
  path: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  badge?: number;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
  defaultOpen?: boolean;
}

// УПРОЩЁННОЕ МЕНЮ - только основные функции
const mainMenuItems: MenuItem[] = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { path: '/connect/feed', icon: Newspaper, label: 'Лента' },
  { path: '/connect/explore', icon: Compass, label: 'Поиск' },
  { path: '/connect/messages', icon: MessageSquare, label: 'Сообщения', badge: 3 },
  { path: '/connect/notifications', icon: Bell, label: 'Уведомления', badge: 5 },
  { path: '/bookmarks', icon: Bookmark, label: 'Закладки' },
];

// Секции аккаунта
const accountSection: MenuSection = {
  id: 'account',
  title: 'Аккаунт',
  defaultOpen: false,
  items: [
    { path: '/profile', icon: User, label: 'Профиль' },
    { path: '/security', icon: Shield, label: 'Безопасность' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
  ],
};

// Минимальная и максимальная ширина sidebar
const MIN_WIDTH = 60;
const DEFAULT_WIDTH = 260;
const MAX_WIDTH = 400;

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();

  // Состояние из localStorage
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem('sidebar-width');
    return saved ? parseInt(saved) : DEFAULT_WIDTH;
  });

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? saved === 'true' : collapsed;
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    account: accountSection.defaultOpen ?? false,
  });

  // Для drag-resize
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('sidebar-width', String(width));
  }, [width]);

  // Resize handlers
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setWidth(newWidth);
        if (newWidth <= MIN_WIDTH + 20) {
          setIsCollapsed(true);
        } else if (isCollapsed && newWidth > MIN_WIDTH + 40) {
          setIsCollapsed(false);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, isCollapsed]);

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (!newCollapsed) {
      setWidth(DEFAULT_WIDTH);
    }
    onToggle?.();
  };

  const toggleSection = (sectionId: string) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const actualWidth = isCollapsed ? MIN_WIDTH : width;

  const renderMenuItem = (item: MenuItem) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group ${
        isActive(item.path)
          ? 'bg-accent/10 text-accent'
          : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
      } ${isCollapsed ? 'justify-center' : ''}`}
      title={isCollapsed ? item.label : undefined}
    >
      <item.icon size={20} />
      {!isCollapsed && (
        <span className="font-medium truncate">{item.label}</span>
      )}
      {item.badge && item.badge > 0 && (
        <span
          className={`bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center ${
            isCollapsed 
              ? 'absolute -top-1 -right-1 w-5 h-5' 
              : 'ml-auto px-2 py-0.5 min-w-[20px]'
          }`}
        >
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
      {/* Tooltip */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {item.label}
          {item.badge && item.badge > 0 && (
            <span className="ml-2 text-accent">({item.badge})</span>
          )}
        </div>
      )}
    </Link>
  );

  return (
    <aside
      ref={sidebarRef}
      style={{ width: actualWidth }}
      className={`fixed left-0 top-0 h-full bg-surface border-r border-border flex flex-col transition-all z-40 ${
        isResizing ? '' : 'duration-300'
      }`}
    >
      {/* Header с кнопкой сворачивания СВЕРХУ */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-border flex-shrink-0">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 ${isCollapsed ? 'mx-auto' : ''}`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">N</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-text-primary tracking-wide">NEXIS</span>
          )}
        </Link>

        {/* Toggle Button - СВЕРХУ! */}
        <button
          onClick={handleToggle}
          className="p-1.5 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
          title={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* User Info */}
      {user && !isCollapsed && (
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">
                {user.firstName?.[0] || user.username[0].toUpperCase()}
              </span>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-medium text-text-primary truncate">
                {user.fullName || user.username}
              </p>
              <p className="text-xs text-text-muted truncate">@{user.username}</p>
            </div>
          </div>
        </div>
      )}

      {/* User avatar only when collapsed */}
      {user && isCollapsed && (
        <div className="p-2 border-b border-border flex justify-center">
          <div className="w-9 h-9 bg-gradient-to-br from-accent to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.firstName?.[0] || user.username[0].toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {/* Main Menu */}
        <div className="space-y-1">
          {mainMenuItems.map(renderMenuItem)}
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-border" />

        {/* Account Section */}
        <div>
          {!isCollapsed ? (
            <button
              onClick={() => toggleSection('account')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-text-muted uppercase tracking-wider hover:text-text-secondary transition-colors"
            >
              <span>{accountSection.title}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${expandedSections.account ? '' : '-rotate-90'}`}
              />
            </button>
          ) : (
            <div className="h-px bg-border mx-2 my-2" />
          )}

          <div
            className={`space-y-1 overflow-hidden transition-all duration-200 ${
              !isCollapsed && !expandedSections.account ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
            }`}
          >
            {accountSection.items.map(renderMenuItem)}
          </div>
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

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={startResize}
          className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-accent/50 transition-colors ${
            isResizing ? 'bg-accent' : ''
          }`}
        />
      )}
    </aside>
  );
}

