import { Bookmark, Search, Trash2, Folder, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const demoBookmarks = [
  {
    id: 1,
    title: 'Документация React',
    url: 'https://react.dev',
    description: 'Официальная документация React',
    folder: 'Разработка',
    createdAt: '2 дня назад'
  },
  {
    id: 2,
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: 'Utility-first CSS framework',
    folder: 'Разработка',
    createdAt: '3 дня назад'
  },
  {
    id: 3,
    title: 'GitHub',
    url: 'https://github.com',
    description: 'Платформа для разработчиков',
    folder: 'Инструменты',
    createdAt: '1 неделю назад'
  },
  {
    id: 4,
    title: 'Интересная статья',
    url: 'https://example.com/article',
    description: 'Про архитектуру приложений',
    folder: 'Читать позже',
    createdAt: '2 недели назад'
  },
];

const folders = ['Все', 'Разработка', 'Инструменты', 'Читать позже', 'Работа'];

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('Все');

  const filteredBookmarks = demoBookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === 'Все' || bookmark.folder === activeFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Bookmark className="text-accent" />
          Закладки
        </h1>
        <p className="text-text-muted mt-1">Сохранённые ссылки и ресурсы</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Поиск закладок..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Folders */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {folders.map(folder => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeFolder === folder
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
            }`}
          >
            <Folder size={16} />
            {folder}
          </button>
        ))}
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {filteredBookmarks.map(bookmark => (
          <div
            key={bookmark.id}
            className="bg-surface border border-border rounded-xl p-4 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-text-primary hover:text-accent transition-colors flex items-center gap-2 group-hover:underline"
                >
                  {bookmark.title}
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-sm text-text-muted mt-1 truncate">{bookmark.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Folder size={12} />
                    {bookmark.folder}
                  </span>
                  <span>{bookmark.createdAt}</span>
                </div>
              </div>
              <button
                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-text-muted opacity-0 group-hover:opacity-100 transition-all"
                title="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <Bookmark size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Закладки не найдены</p>
        </div>
      )}
    </div>
  );
}

