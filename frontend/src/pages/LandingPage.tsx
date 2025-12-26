import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Shield,
  MessageSquare,
  Cloud,
  Code2,
  Users,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'JWT токены, двухфакторная аутентификация, OAuth2',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    title: 'Социальная сеть',
    description: 'Лента, посты, сообщения, подписки',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'Облачное хранилище',
    description: 'Файлы, медиа, синхронизация',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code2,
    title: 'API для разработчиков',
    description: 'REST API, SDK, Webhooks, OAuth Apps',
    color: 'from-orange-500 to-red-500',
  },
];

const modules = [
  {
    name: 'NEXIS ID',
    status: 'active',
    description: 'Единая система аутентификации и управления профилем',
    icon: Shield,
  },
  {
    name: 'NEXIS Connect',
    status: 'active',
    description: 'Сообщения, групповые чаты и социальная сеть',
    icon: MessageSquare,
  },
  {
    name: 'NEXIS Workspace',
    status: 'soon',
    description: 'Проекты, задачи и командная работа',
    icon: Users,
  },
  {
    name: 'NEXIS Cloud',
    status: 'soon',
    description: 'Файловое хранилище и синхронизация',
    icon: Cloud,
  },
  {
    name: 'NEXIS Dev',
    status: 'soon',
    description: 'API, SDK и инструменты для разработчиков',
    icon: Code2,
  },
  {
    name: 'NEXIS Mobile',
    status: 'planned',
    description: 'iOS и Android приложения',
    icon: Globe,
  },
];

const stats = [
  { value: '10K+', label: 'Пользователей' },
  { value: '99.9%', label: 'Uptime' },
  { value: '50ms', label: 'Latency' },
  { value: '24/7', label: 'Поддержка' },
];

export default function LandingPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-text-primary">NEXIS</span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">
                Возможности
              </a>
              <a href="#modules" className="text-text-secondary hover:text-text-primary transition-colors">
                Модули
              </a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">
                Цены
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors"
                >
                  Открыть Dashboard
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors"
                  >
                    Начать бесплатно
                    <ArrowRight size={18} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Zap size={16} />
            Версия 1.0 уже доступна
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Единая платформа
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              для всего
            </span>
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            NEXIS — это экосистема инструментов для общения, работы и разработки.
            Один аккаунт, безграничные возможности.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              Начать бесплатно
              <ArrowRight size={20} />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 bg-surface border border-border hover:bg-surface-2 text-text-primary rounded-xl font-semibold text-lg transition-colors"
            >
              Узнать больше
              <ChevronRight size={20} />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Возможности платформы
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Всё что нужно для работы и общения — в одном месте
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Модули экосистемы
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Выбирайте только те инструменты, которые нужны вам
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <module.icon size={24} className="text-accent" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    module.status === 'active' 
                      ? 'bg-green-500/20 text-green-500'
                      : module.status === 'soon'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {module.status === 'active' ? 'Активно' : module.status === 'soon' ? 'Скоро' : 'Планируется'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{module.name}</h3>
                <p className="text-text-secondary text-sm">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Готовы начать?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Присоединяйтесь к тысячам пользователей, которые уже используют NEXIS
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold text-lg transition-all shadow-lg"
            >
              Создать аккаунт
              <ArrowRight size={20} />
            </Link>
            <div className="flex items-center gap-2 text-text-muted">
              <Check size={18} className="text-green-500" />
              Бесплатно навсегда
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-text-primary">NEXIS</span>
            </div>
            <p className="text-text-muted text-sm">
              © 2025 NEXIS Platform. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors text-sm">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors text-sm">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

