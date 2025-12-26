import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Bell,
  Newspaper,
  Shield,
  Cloud,
  Code2,
  FolderKanban,
  ArrowRight,
  Zap,
  Activity,
  HardDrive,
  TrendingUp,
  Settings,
  ChevronRight,
} from 'lucide-react';

// Модули экосистемы
const modules = [
  {
    id: 'connect',
    name: 'NEXIS Connect',
    description: 'Социальная сеть и общение',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    status: 'active',
    path: '/connect/feed',
    stats: { posts: 156, messages: 23 },
  },
  {
    id: 'workspace',
    name: 'NEXIS Workspace',
    description: 'Проекты и командная работа',
    icon: FolderKanban,
    color: 'from-blue-500 to-cyan-500',
    status: 'soon',
    path: '/workspace',
    stats: null,
  },
  {
    id: 'cloud',
    name: 'NEXIS Cloud',
    description: 'Облачное хранилище',
    icon: Cloud,
    color: 'from-green-500 to-emerald-500',
    status: 'soon',
    path: '/cloud',
    stats: null,
  },
  {
    id: 'dev',
    name: 'NEXIS Dev',
    description: 'API и инструменты',
    icon: Code2,
    color: 'from-orange-500 to-red-500',
    status: 'soon',
    path: '/dev',
    stats: null,
  },
];

// Быстрые действия
const quickActions = [
  { icon: Newspaper, label: 'Новый пост', path: '/connect/feed', color: 'text-purple-500' },
  { icon: MessageSquare, label: 'Сообщения', path: '/connect/messages', color: 'text-blue-500' },
  { icon: Bell, label: 'Уведомления', path: '/connect/notifications', color: 'text-yellow-500' },
  { icon: Settings, label: 'Настройки', path: '/settings', color: 'text-gray-500' },
];

// Статистика аккаунта
const accountStats = [
  { icon: Activity, label: 'Активность', value: '98%', color: 'text-green-500' },
  { icon: HardDrive, label: 'Хранилище', value: '2.4 GB / 10 GB', color: 'text-blue-500' },
  { icon: Shield, label: 'Безопасность', value: 'Высокая', color: 'text-purple-500' },
  { icon: TrendingUp, label: 'Рейтинг', value: '4.8 / 5', color: 'text-yellow-500' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            {getGreeting()}, {user?.firstName || user?.username}! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Добро пожаловать в NEXIS Platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Онлайн
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-accent/50 hover:shadow-lg transition-all group"
          >
            <div className={`p-2 rounded-lg bg-surface-2 ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon size={20} />
            </div>
            <span className="font-medium text-text-primary">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Модули экосистемы</h2>
          <Link to="/" className="text-sm text-accent hover:underline flex items-center gap-1">
            Все модули <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.status === 'active' ? module.path : '#'}
              className={`relative bg-surface border border-border rounded-xl p-5 transition-all group ${
                module.status === 'active' 
                  ? 'hover:border-accent/50 hover:shadow-xl cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  module.status === 'active' 
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {module.status === 'active' ? 'Активно' : 'Скоро'}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon size={24} className="text-white" />
              </div>

              {/* Info */}
              <h3 className="font-semibold text-text-primary">{module.name}</h3>
              <p className="text-sm text-text-muted mt-1">{module.description}</p>

              {/* Stats (if active) */}
              {module.status === 'active' && module.stats && (
                <div className="flex gap-4 mt-4 pt-4 border-t border-border text-sm">
                  <span className="text-text-muted">
                    <span className="font-semibold text-text-primary">{module.stats.posts}</span> постов
                  </span>
                  <span className="text-text-muted">
                    <span className="font-semibold text-text-primary">{module.stats.messages}</span> сообщений
                  </span>
                </div>
              )}

              {/* Arrow for active modules */}
              {module.status === 'active' && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={18} className="text-accent" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Account Stats */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Activity size={18} className="text-accent" />
            Статистика аккаунта
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {accountStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                <stat.icon size={20} className={stat.color} />
                <div>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                  <p className="font-semibold text-text-primary">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-muted">Хранилище</span>
                <span className="text-text-primary font-medium">24%</span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-muted">API лимит</span>
                <span className="text-text-primary font-medium">12%</span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Shield size={18} className="text-accent" />
            Безопасность
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-text-primary">Email подтверждён</span>
              </div>
              <span className="text-xs text-green-500">✓</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-text-primary">2FA не включена</span>
              </div>
              <Link to="/security" className="text-xs text-accent hover:underline">
                Включить
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-text-primary">Надёжный пароль</span>
              </div>
              <span className="text-xs text-green-500">✓</span>
            </div>
          </div>

          <Link
            to="/security"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-sm font-medium text-text-secondary transition-colors"
          >
            Настройки безопасности
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border border-accent/20 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <Zap size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Начните использовать NEXIS</h3>
              <p className="text-sm text-text-muted mt-1">
                Завершите настройку профиля и откройте для себя все возможности платформы
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/profile"
              className="px-4 py-2 bg-surface border border-border hover:bg-surface-2 rounded-lg text-sm font-medium text-text-primary transition-colors"
            >
              Настроить профиль
            </Link>
            <Link
              to="/connect/feed"
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              Открыть ленту
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

