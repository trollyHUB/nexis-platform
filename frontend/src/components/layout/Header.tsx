import { Bell, Search, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-surface-2 rounded-lg text-text-secondary"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-surface-2 rounded-lg px-3 py-2 w-64 lg:w-80">
          <Search size={18} className="text-text-muted" />
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent border-none outline-none text-text-primary placeholder-text-muted w-full text-sm"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-text-muted bg-surface rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-surface-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-accent font-semibold text-sm">
                {user?.username[0].toUpperCase()}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-text-primary">
              {user?.username}
            </span>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-xl z-50 py-1">
                <div className="px-3 py-2 border-b border-border">
                  <p className="font-medium text-text-primary">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-text-muted">{user?.email}</p>
                </div>
                <a href="/profile" className="block px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
                  Профиль
                </a>
                <a href="/settings" className="block px-3 py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary">
                  Настройки
                </a>
                <div className="border-t border-border mt-1 pt-1">
                  <button className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-500/10">
                    Выйти
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

