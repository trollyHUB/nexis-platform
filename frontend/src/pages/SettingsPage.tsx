import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Check,
} from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'appearance' | 'language' | 'privacy';

const tabs = [
  { id: 'profile' as const, icon: User, label: 'Профиль' },
  { id: 'security' as const, icon: Lock, label: 'Безопасность' },
  { id: 'notifications' as const, icon: Bell, label: 'Уведомления' },
  { id: 'appearance' as const, icon: Palette, label: 'Внешний вид' },
  { id: 'language' as const, icon: Globe, label: 'Язык' },
  { id: 'privacy' as const, icon: Shield, label: 'Приватность' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Настройки</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-surface border border-border rounded-xl p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}

            <div className="my-2 border-t border-border" />

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Выйти</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <ProfileSettings user={user} />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'appearance' && <AppearanceSettings theme={theme} setTheme={setTheme} />}
          {activeTab === 'language' && <LanguageSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
        </div>
      </div>
    </div>
  );
}

// Profile Settings
function ProfileSettings({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <SettingsCard title="Основная информация" description="Обновите вашу личную информацию">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Имя" defaultValue={user?.firstName || ''} placeholder="Введите имя" />
            <InputField label="Фамилия" defaultValue={user?.lastName || ''} placeholder="Введите фамилию" />
          </div>
          <InputField label="Username" defaultValue={user?.username || ''} placeholder="username" />
          <InputField label="Email" defaultValue={user?.email || ''} type="email" disabled />
          <TextareaField label="О себе" defaultValue={user?.bio || ''} placeholder="Расскажите о себе..." />
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition font-medium">
            Сохранить изменения
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}

// Security Settings
function SecuritySettings() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Смена пароля" description="Обновите ваш пароль для безопасности">
        <div className="space-y-4">
          <InputField label="Текущий пароль" type="password" placeholder="••••••••" />
          <InputField label="Новый пароль" type="password" placeholder="••••••••" />
          <InputField label="Подтвердите пароль" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition font-medium">
            Обновить пароль
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Двухфакторная аутентификация" description="Добавьте дополнительный уровень защиты">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">2FA отключена</p>
            <p className="text-text-muted text-sm">Рекомендуем включить для безопасности</p>
          </div>
          <button className="px-4 py-2 bg-surface-2 text-text-primary rounded-lg hover:bg-border transition font-medium">
            Настроить
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Активные сессии" description="Управляйте устройствами где вы вошли">
        <div className="space-y-3">
          <SessionItem device="Chrome на Windows" location="Астана, KZ" current />
          <SessionItem device="Safari на iPhone" location="Алматы, KZ" />
        </div>
      </SettingsCard>
    </div>
  );
}

// Notification Settings
function NotificationSettings() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Email уведомления" description="Выберите какие уведомления получать на email">
        <div className="space-y-4">
          <ToggleOption label="Новые сообщения" description="Уведомления о новых сообщениях" defaultChecked />
          <ToggleOption label="Новые подписчики" description="Когда кто-то подписывается на вас" defaultChecked />
          <ToggleOption label="Упоминания" description="Когда вас упоминают в постах" defaultChecked />
          <ToggleOption label="Новости платформы" description="Обновления и новости Identity & Social" />
        </div>
      </SettingsCard>

      <SettingsCard title="Push уведомления" description="Уведомления в браузере">
        <div className="space-y-4">
          <ToggleOption label="Включить push-уведомления" description="Получать уведомления в браузере" />
        </div>
      </SettingsCard>
    </div>
  );
}

// Appearance Settings
function AppearanceSettings({ theme, setTheme }: { theme: string; setTheme: (t: any) => void }) {
  return (
    <div className="space-y-6">
      <SettingsCard title="Тема оформления" description="Выберите предпочитаемую тему">
        <div className="grid grid-cols-3 gap-4">
          <ThemeOption
            icon={Sun}
            label="Светлая"
            active={theme === 'light'}
            onClick={() => setTheme('light')}
          />
          <ThemeOption
            icon={Moon}
            label="Тёмная"
            active={theme === 'dark'}
            onClick={() => setTheme('dark')}
          />
          <ThemeOption
            icon={Monitor}
            label="Системная"
            active={false}
            onClick={() => {}}
            disabled
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Акцентный цвет" description="Выберите основной цвет интерфейса">
        <div className="flex gap-3">
          {['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                color === '#3b82f6' ? 'ring-2 ring-offset-2 ring-offset-surface ring-white' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-text-muted text-sm mt-3">Скоро: выбор акцентного цвета</p>
      </SettingsCard>
    </div>
  );
}

// Language Settings
function LanguageSettings() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Язык интерфейса" description="Выберите язык отображения">
        <div className="space-y-2">
          <LanguageOption label="Русский" active />
          <LanguageOption label="English" />
          <LanguageOption label="Қазақша" disabled />
        </div>
      </SettingsCard>
    </div>
  );
}

// Privacy Settings
function PrivacySettings() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Приватность профиля" description="Управляйте видимостью вашего профиля">
        <div className="space-y-4">
          <ToggleOption label="Публичный профиль" description="Все могут видеть ваш профиль" defaultChecked />
          <ToggleOption label="Показывать email" description="Отображать email в профиле" />
          <ToggleOption label="Показывать активность" description="Показывать когда вы были онлайн" defaultChecked />
        </div>
      </SettingsCard>

      <SettingsCard title="Опасная зона" description="Необратимые действия с аккаунтом">
        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
          <div>
            <p className="text-red-500 font-medium">Удалить аккаунт</p>
            <p className="text-text-muted text-sm">Все данные будут удалены навсегда</p>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium">
            Удалить
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}

// Reusable Components
function SettingsCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-text-primary">{title}</h2>
        <p className="text-text-muted text-sm">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InputField({ label, type = 'text', ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <input
        type={type}
        className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition disabled:opacity-50"
        {...props}
      />
    </div>
  );
}

function TextareaField({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <textarea
        rows={4}
        className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition resize-none"
        {...props}
      />
    </div>
  );
}

function ToggleOption({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-primary font-medium">{label}</p>
        <p className="text-text-muted text-sm">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-12 h-7 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-surface-2'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform mx-1 ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

function ThemeOption({ icon: Icon, label, active, onClick, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-xl border-2 transition ${
        active 
          ? 'border-accent bg-accent/5' 
          : 'border-border hover:border-text-muted'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon size={24} className={active ? 'text-accent' : 'text-text-secondary'} />
      <p className={`mt-2 text-sm font-medium ${active ? 'text-accent' : 'text-text-secondary'}`}>{label}</p>
      {active && <Check size={16} className="text-accent mx-auto mt-1" />}
    </button>
  );
}

function LanguageOption({ label, active, disabled }: { label: string; active?: boolean; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
        active 
          ? 'bg-accent/10 border border-accent/20' 
          : 'bg-surface-2 hover:bg-border'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className={active ? 'text-accent font-medium' : 'text-text-primary'}>{label}</span>
      {active && <Check size={18} className="text-accent" />}
      {disabled && <span className="text-xs text-text-muted">скоро</span>}
    </button>
  );
}

function SessionItem({ device, location, current }: { device: string; location: string; current?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface-2 rounded-lg">
      <div>
        <p className="text-text-primary font-medium flex items-center gap-2">
          {device}
          {current && <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded">Текущая</span>}
        </p>
        <p className="text-text-muted text-sm">{location}</p>
      </div>
      {!current && (
        <button className="text-red-500 text-sm hover:underline">Завершить</button>
      )}
    </div>
  );
}

