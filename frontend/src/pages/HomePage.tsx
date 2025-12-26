import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Shield, Users, Code2, Cloud } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-text-primary tracking-wide">NEXIS</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-medium"
              >
                Открыть панель
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition font-medium"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-medium"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">Версия 0.2.0 — Активная разработка</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">NEXIS</span>
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-4 max-w-3xl mx-auto">
          <strong className="text-text-primary">N</strong>etwork{' '}
          <strong className="text-text-primary">E</strong>nterprise{' '}
          e<strong className="text-text-primary">X</strong>perience{' '}
          <strong className="text-text-primary">I</strong>dentity{' '}
          <strong className="text-text-primary">S</strong>ystem
        </p>
        <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
          Единая точка входа в экосистему проектов. Управляйте идентичностью,
          общайтесь, создавайте проекты — всё в одном месте.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              Перейти в панель →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
              >
                Начать бесплатно
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-surface border border-border text-text-primary font-semibold rounded-xl hover:bg-surface-2 transition"
              >
                Войти в аккаунт
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Возможности платформы</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={Shield} title="Безопасность" desc="JWT токены, 2FA, OAuth2" />
          <FeatureCard icon={Users} title="Социальная сеть" desc="Лента, подписки, чаты" />
          <FeatureCard icon={Cloud} title="Облачное хранилище" desc="Файлы и медиа" />
          <FeatureCard icon={Code2} title="API для разработчиков" desc="SDK, Webhooks, OAuth Apps" />
        </div>
      </section>

      {/* Modules */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Модули экосистемы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ModuleCard
            title="NEXIS ID"
            desc="Единая система аутентификации и управления профилем"
            status="active"
          />
          <ModuleCard
            title="NEXIS Connect"
            desc="Сообщения, групповые чаты и видеозвонки"
            status="active"
          />
          <ModuleCard
            title="NEXIS Workspace"
            desc="Проекты, задачи и командная работа"
            status="soon"
          />
          <ModuleCard
            title="NEXIS Cloud"
            desc="Файловое хранилище и синхронизация"
            status="soon"
          />
          <ModuleCard
            title="NEXIS Dev"
            desc="API, SDK и инструменты для разработчиков"
            status="soon"
          />
          <ModuleCard
            title="NEXIS Mobile"
            desc="iOS и Android приложения"
            status="planned"
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-8">Технологии</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Kotlin', 'Spring Boot 4', 'PostgreSQL', 'JWT', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Docker'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-surface border border-border text-text-secondary rounded-lg text-sm">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="font-bold text-text-primary">NEXIS</span>
          </div>
          <p className="text-text-muted text-sm">
            © 2025 NEXIS. Your Digital Universe.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-lg flex items-center justify-center mb-4">
        <Icon size={24} className="text-accent" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{desc}</p>
    </div>
  );
}

function ModuleCard({ title, desc, status }: { title: string; desc: string; status: 'active' | 'soon' | 'planned' }) {
  const statusColors = {
    active: 'bg-green-500/10 text-green-500 border-green-500/20',
    soon: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    planned: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  };
  const statusText = {
    active: 'Активно',
    soon: 'Скоро',
    planned: 'Планируется',
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
          {statusText[status]}
        </span>
      </div>
      <p className="text-text-secondary text-sm">{desc}</p>
    </div>
  );
}

