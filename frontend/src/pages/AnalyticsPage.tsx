import { BarChart3, TrendingUp, TrendingDown, Users, Eye, Clock, Activity } from 'lucide-react';

const stats = [
  { label: 'Всего просмотров', value: '24,532', change: '+12.5%', trend: 'up', icon: Eye },
  { label: 'Уникальных посетителей', value: '8,234', change: '+8.2%', trend: 'up', icon: Users },
  { label: 'Среднее время', value: '4m 23s', change: '-2.1%', trend: 'down', icon: Clock },
  { label: 'Активных сессий', value: '1,429', change: '+15.3%', trend: 'up', icon: Activity },
];

const chartData = [
  { day: 'Пн', views: 1200, users: 450 },
  { day: 'Вт', views: 1800, users: 620 },
  { day: 'Ср', views: 2200, users: 780 },
  { day: 'Чт', views: 1900, users: 710 },
  { day: 'Пт', views: 2800, users: 920 },
  { day: 'Сб', views: 3200, users: 1100 },
  { day: 'Вс', views: 2400, users: 850 },
];

const topPages = [
  { page: '/dashboard', views: 5420, percentage: 22 },
  { page: '/feed', views: 4230, percentage: 17 },
  { page: '/profile', views: 3180, percentage: 13 },
  { page: '/messages', views: 2940, percentage: 12 },
  { page: '/settings', views: 1820, percentage: 7 },
];

export default function AnalyticsPage() {
  const maxViews = Math.max(...chartData.map(d => d.views));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <BarChart3 className="text-accent" />
          Аналитика
        </h1>
        <p className="text-text-muted mt-1">Статистика и показатели вашего аккаунта</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <stat.icon size={20} className="text-accent" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Просмотры за неделю</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-accent rounded-full"></span>
                Просмотры
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Пользователи
              </span>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 h-48 items-end">
                  <div
                    className="flex-1 bg-accent rounded-t-lg transition-all hover:bg-accent/80"
                    style={{ height: `${(data.views / maxViews) * 100}%` }}
                    title={`${data.views} просмотров`}
                  />
                  <div
                    className="flex-1 bg-purple-500 rounded-t-lg transition-all hover:bg-purple-400"
                    style={{ height: `${(data.users / maxViews) * 100}%` }}
                    title={`${data.users} пользователей`}
                  />
                </div>
                <span className="text-xs text-text-muted">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-4">Популярные страницы</h3>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{page.page}</span>
                  <span className="text-sm text-text-muted">{page.views.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Devices */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-4">Устройства</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Desktop</span>
              <span className="font-medium text-text-primary">58%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Mobile</span>
              <span className="font-medium text-text-primary">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Tablet</span>
              <span className="font-medium text-text-primary">7%</span>
            </div>
          </div>
        </div>

        {/* Geography */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-4">География</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">🇷🇺 Россия</span>
              <span className="font-medium text-text-primary">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">🇰🇿 Казахстан</span>
              <span className="font-medium text-text-primary">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">🇺🇦 Украина</span>
              <span className="font-medium text-text-primary">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">🌍 Другие</span>
              <span className="font-medium text-text-primary">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

