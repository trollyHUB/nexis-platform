import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  MessageSquare,
  Bell,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Подписчики',
      value: '1,234',
      change: '+12%',
      up: true,
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Сообщения',
      value: '56',
      change: '+3',
      up: true,
      icon: MessageSquare,
      color: 'green'
    },
    {
      label: 'Уведомления',
      value: '12',
      change: '-5',
      up: false,
      icon: Bell,
      color: 'orange'
    },
    {
      label: 'Просмотры',
      value: '8.9K',
      change: '+24%',
      up: true,
      icon: TrendingUp,
      color: 'purple'
    },
  ];

  const recentActivity = [
    { type: 'login', text: 'Вход в систему', time: '5 минут назад' },
    { type: 'update', text: 'Обновление профиля', time: '2 часа назад' },
    { type: 'message', text: 'Новое сообщение от @user123', time: '3 часа назад' },
    { type: 'follow', text: 'Новый подписчик @johndoe', time: '1 день назад' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Привет, {user?.firstName || user?.username}! 👋
        </h1>
        <p className="text-text-secondary mt-1">
          Вот что происходит в твоём аккаунте
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-xl p-5 border border-border hover:border-accent/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-muted text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon size={20} className={`text-${stat.color}-500`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.up ? (
                <ArrowUpRight size={16} className="text-green-500" />
              ) : (
                <ArrowDownRight size={16} className="text-red-500" />
              )}
              <span className={stat.up ? 'text-green-500' : 'text-red-500'} >
                {stat.change}
              </span>
              <span className="text-text-muted text-sm ml-1">за неделю</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-text-primary">Последняя активность</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-4 flex items-center gap-4 hover:bg-surface-2 transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary truncate">{activity.text}</p>
                  <p className="text-text-muted text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <button className="text-accent hover:text-accent-hover text-sm font-medium">
              Показать всё →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-text-primary">Быстрые действия</h2>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full p-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium">
              Создать пост
            </button>
            <button className="w-full p-3 bg-surface-2 text-text-primary rounded-lg hover:bg-border transition-colors font-medium">
              Редактировать профиль
            </button>
            <button className="w-full p-3 bg-surface-2 text-text-primary rounded-lg hover:bg-border transition-colors font-medium">
              Пригласить друзей
            </button>
            <button className="w-full p-3 bg-surface-2 text-text-primary rounded-lg hover:bg-border transition-colors font-medium">
              Настройки
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🚀</span>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Добро пожаловать в Identity & Social!</h3>
            <p className="text-text-secondary mt-1">
              Это твой личный кабинет. Здесь ты можешь управлять профилем,
              общаться с друзьями и следить за активностью.
            </p>
            <button className="mt-3 text-accent hover:text-accent-hover font-medium text-sm">
              Начать тур по платформе →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

