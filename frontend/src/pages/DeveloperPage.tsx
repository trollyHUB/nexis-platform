import { Code2, Key, Copy, Eye, EyeOff, Plus, ExternalLink, Book, Zap, GitBranch, Terminal } from 'lucide-react';
import { useState } from 'react';

const apiKeys = [
  { id: 1, name: 'Production API Key', key: 'nx_live_sk_...4f8a', created: '15 дек 2025', lastUsed: '2 часа назад', active: true },
  { id: 2, name: 'Development Key', key: 'nx_test_sk_...9b2c', created: '10 дек 2025', lastUsed: 'Вчера', active: true },
  { id: 3, name: 'Legacy Key', key: 'nx_live_sk_...1d3e', created: '1 ноя 2025', lastUsed: '2 недели назад', active: false },
];

const apiStats = [
  { label: 'Запросов сегодня', value: '12,453' },
  { label: 'Успешных', value: '99.8%' },
  { label: 'Среднее время', value: '45ms' },
  { label: 'Лимит', value: '100K/день' },
];

const endpoints = [
  { method: 'GET', path: '/api/users/me', description: 'Получить текущего пользователя' },
  { method: 'POST', path: '/api/posts', description: 'Создать новый пост' },
  { method: 'GET', path: '/api/posts/feed', description: 'Получить ленту постов' },
  { method: 'POST', path: '/api/auth/login', description: 'Авторизация' },
  { method: 'POST', path: '/api/auth/register', description: 'Регистрация' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-green-500/20 text-green-500',
  POST: 'bg-blue-500/20 text-blue-500',
  PUT: 'bg-yellow-500/20 text-yellow-500',
  DELETE: 'bg-red-500/20 text-red-500',
};

export default function DeveloperPage() {
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});

  const toggleKeyVisibility = (id: number) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // В реальном приложении показать toast
    alert('Скопировано!');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Code2 className="text-accent" />
            API для разработчиков
          </h1>
          <p className="text-text-muted mt-1">Интеграция и документация NEXIS API</p>
        </div>
        <div className="flex gap-2">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:bg-surface-2 rounded-lg font-medium text-text-secondary transition-colors"
          >
            <Book size={18} />
            Документация
            <ExternalLink size={14} />
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
            <Plus size={18} />
            Новый ключ
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {apiStats.map((stat, index) => (
          <div key={index} className="bg-surface border border-border rounded-xl p-4">
            <p className="text-sm text-text-muted">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Keys */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <Key size={18} className="text-accent" />
              API Ключи
            </h3>
          </div>
          <div className="divide-y divide-border">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">{apiKey.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      apiKey.active 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {apiKey.active ? 'Активен' : 'Отключен'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <code className="flex-1 px-3 py-2 bg-surface-2 rounded-lg text-sm font-mono text-text-secondary">
                    {showKeys[apiKey.id] ? apiKey.key.replace('...', '_abcd1234_') : apiKey.key}
                  </code>
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-2 hover:bg-surface-2 rounded-lg text-text-muted transition-colors"
                  >
                    {showKeys[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 hover:bg-surface-2 rounded-lg text-text-muted transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div className="flex gap-4 text-xs text-text-muted">
                  <span>Создан: {apiKey.created}</span>
                  <span>Использован: {apiKey.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <Zap size={18} className="text-accent" />
              Быстрый старт
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-text-muted mb-4">
              Используйте следующий код для начала работы с API:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
{`// Пример запроса к API
const response = await fetch(
  'https://api.nexis.io/v1/users/me',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const user = await response.json();
console.log(user);`}
              </pre>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-2 px-3 py-2 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-sm text-text-secondary transition-colors">
                <Copy size={14} />
                Копировать
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-sm text-text-secondary transition-colors">
                <Terminal size={14} />
                Попробовать
              </button>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <GitBranch size={18} className="text-accent" />
              Доступные эндпоинты
            </h3>
            <a href="#" className="text-sm text-accent hover:underline flex items-center gap-1">
              Все эндпоинты <ExternalLink size={12} />
            </a>
          </div>
          <div className="divide-y divide-border">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-surface-2 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${methodColors[endpoint.method]}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-text-primary">{endpoint.path}</code>
                </div>
                <span className="text-sm text-text-muted">{endpoint.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

