import { useState } from 'react';
import {
  Bell,
  MessageSquare,
  Heart,
  UserPlus,
  AtSign,
  Settings,
  Check,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'follow' | 'mention' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'follow',
    title: 'Новый подписчик',
    description: '@johndoe подписался на вас',
    time: '5 минут назад',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    title: 'Новый лайк',
    description: '@jane_doe оценил ваш пост',
    time: '15 минут назад',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'Новое сообщение',
    description: 'У вас новое сообщение от @alex',
    time: '1 час назад',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    title: 'Упоминание',
    description: '@designer упомянул вас в комментарии',
    time: '2 часа назад',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Добро пожаловать!',
    description: 'Добро пожаловать в Identity & Social. Настройте свой профиль.',
    time: '1 день назад',
    read: true,
  },
];

const typeIcons = {
  message: MessageSquare,
  like: Heart,
  follow: UserPlus,
  mention: AtSign,
  system: Bell,
};

const typeColors = {
  message: 'bg-blue-500/10 text-blue-500',
  like: 'bg-red-500/10 text-red-500',
  follow: 'bg-green-500/10 text-green-500',
  mention: 'bg-purple-500/10 text-purple-500',
  system: 'bg-accent/10 text-accent',
};

type FilterType = 'all' | 'unread' | 'message' | 'like' | 'follow' | 'mention';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<FilterType>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Уведомления</h1>
          {unreadCount > 0 && (
            <p className="text-text-muted text-sm">{unreadCount} непрочитанных</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition"
          >
            <Check size={16} />
            <span className="hidden sm:inline">Прочитать все</span>
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <FilterButton label="Все" active={filter === 'all'} onClick={() => setFilter('all')} />
        <FilterButton label="Непрочитанные" active={filter === 'unread'} onClick={() => setFilter('unread')} count={unreadCount} />
        <FilterButton label="Сообщения" active={filter === 'message'} onClick={() => setFilter('message')} />
        <FilterButton label="Лайки" active={filter === 'like'} onClick={() => setFilter('like')} />
        <FilterButton label="Подписки" active={filter === 'follow'} onClick={() => setFilter('follow')} />
      </div>

      {/* Notifications List */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell size={48} className="mx-auto text-text-muted mb-4" />
            <p className="text-text-primary font-medium">Нет уведомлений</p>
            <p className="text-text-muted text-sm">Здесь будут появляться ваши уведомления</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id)}
                onDelete={() => deleteNotification(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  count
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
        active 
          ? 'bg-accent text-white' 
          : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
      }`}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className={`px-1.5 py-0.5 text-xs rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-accent text-white'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function NotificationItem({
  notification,
  onRead,
  onDelete
}: {
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
}) {
  const Icon = typeIcons[notification.type];
  const colorClass = typeColors[notification.type];

  return (
    <div
      className={`flex items-start gap-4 p-4 hover:bg-surface-2 transition cursor-pointer ${
        !notification.read ? 'bg-accent/5' : ''
      }`}
      onClick={onRead}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon size={18} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`font-medium ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}`}>
              {notification.title}
            </p>
            <p className="text-text-muted text-sm">{notification.description}</p>
          </div>
          {!notification.read && (
            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
          )}
        </div>
        <p className="text-text-muted text-xs mt-1">{notification.time}</p>
      </div>

      {/* Actions */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

