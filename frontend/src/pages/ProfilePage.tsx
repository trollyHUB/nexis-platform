import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Mail,
  Calendar,
  Shield,
  Edit2,
  Camera,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github,
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Никогда';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-accent/20 via-purple-500/20 to-pink-500/20 relative">
          <button className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition">
            <Camera size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-surface border-4 border-surface rounded-full flex items-center justify-center">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-accent">
                    {user.username[0].toUpperCase()}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-accent hover:bg-accent-hover rounded-full text-white transition">
                <Camera size={14} />
              </button>
            </div>

            {/* Name & Actions */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {user.fullName || user.username}
                </h1>
                <p className="text-text-muted">@{user.username}</p>
              </div>
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-border text-text-primary rounded-lg transition font-medium"
              >
                <Edit2 size={16} />
                Редактировать
              </Link>
            </div>
          </div>

          {/* Bio */}
          {user.bio ? (
            <p className="mt-4 text-text-secondary">{user.bio}</p>
          ) : (
            <p className="mt-4 text-text-muted italic">Добавьте описание профиля...</p>
          )}

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-text-muted" />
              Не указано
            </span>
            <span className="flex items-center gap-1.5">
              <LinkIcon size={14} className="text-text-muted" />
              Нет ссылки
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-text-muted" />
              Регистрация: {formatDate(user.createdAt)}
            </span>
          </div>

          {/* Roles */}
          <div className="mt-4 flex gap-2">
            {user.roles.map((role) => (
              <span
                key={role}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  role === 'ROLE_ADMIN'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : role === 'ROLE_MODERATOR'
                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    : 'bg-accent/10 text-accent border border-accent/20'
                }`}
              >
                {role.replace('ROLE_', '')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Account Info */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-text-primary">Информация об аккаунте</h2>
          </div>
          <div className="p-4 space-y-4">
            <InfoRow
              icon={Mail}
              label="Email"
              value={user.email}
              badge={user.emailVerified ? 'Подтверждён' : 'Не подтверждён'}
              badgeColor={user.emailVerified ? 'green' : 'yellow'}
            />
            <InfoRow
              icon={Shield}
              label="UUID"
              value={user.uuid}
              mono
            />
            <InfoRow
              icon={Calendar}
              label="Последний вход"
              value={formatDate(user.lastLoginAt)}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-text-primary">Социальные сети</h2>
            <button className="text-accent text-sm hover:underline">Добавить</button>
          </div>
          <div className="p-4 space-y-3">
            <SocialLink icon={Twitter} name="Twitter" connected={false} />
            <SocialLink icon={Github} name="GitHub" connected={false} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <StatCard label="Подписчики" value="0" />
        <StatCard label="Подписки" value="0" />
        <StatCard label="Посты" value="0" />
        <StatCard label="Лайки" value="0" />
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
  badge,
  badgeColor = 'green'
}: {
  icon: any;
  label: string;
  value: string;
  mono?: boolean;
  badge?: string;
  badgeColor?: 'green' | 'yellow';
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-surface-2 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-text-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className={`text-text-primary truncate ${mono ? 'font-mono text-xs' : 'text-sm'}`}>
          {value}
        </p>
      </div>
      {badge && (
        <span className={`px-2 py-0.5 text-xs rounded-full ${
          badgeColor === 'green' 
            ? 'bg-green-500/10 text-green-500' 
            : 'bg-yellow-500/10 text-yellow-500'
        }`}>
          {badge}
        </span>
      )}
    </div>
  );
}

function SocialLink({ icon: Icon, name, connected }: { icon: any; name: string; connected: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface-2 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-text-secondary" />
        <span className="text-text-primary font-medium">{name}</span>
      </div>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
          connected 
            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
            : 'bg-accent/10 text-accent hover:bg-accent/20'
        }`}
      >
        {connected ? 'Отключить' : 'Подключить'}
      </button>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-text-muted text-sm">{label}</p>
    </div>
  );
}
