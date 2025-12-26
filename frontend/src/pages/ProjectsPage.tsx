import { FolderKanban, Plus, Search, Filter, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';

// Демо данные проектов
const demoProjects = [
  { id: 1, name: 'NEXIS Platform', description: 'Основная платформа', status: 'active', members: 5, tasks: 24 },
  { id: 2, name: 'Mobile App', description: 'iOS и Android приложение', status: 'active', members: 3, tasks: 18 },
  { id: 3, name: 'API Gateway', description: 'Микросервисы', status: 'planning', members: 2, tasks: 8 },
  { id: 4, name: 'Documentation', description: 'Техническая документация', status: 'completed', members: 1, tasks: 12 },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-500',
  planning: 'bg-yellow-500/20 text-yellow-500',
  completed: 'bg-blue-500/20 text-blue-500',
  paused: 'bg-gray-500/20 text-gray-500',
};

const statusLabels: Record<string, string> = {
  active: 'Активный',
  planning: 'Планирование',
  completed: 'Завершён',
  paused: 'Приостановлен',
};

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = demoProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <FolderKanban className="text-accent" />
            Проекты
          </h1>
          <p className="text-text-muted mt-1">Управление вашими проектами</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Новый проект
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
            <Filter size={18} />
            Фильтры
          </button>
          <div className="flex bg-surface border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className={`bg-surface border border-border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group ${
              viewMode === 'list' ? 'flex items-center gap-4' : ''
            }`}
          >
            <div className={`w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors`}>
              <FolderKanban size={24} className="text-accent" />
            </div>
            <div className={viewMode === 'list' ? 'flex-1 flex items-center justify-between' : 'mt-4'}>
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-text-muted mt-1">{project.description}</p>
                {viewMode === 'grid' && (
                  <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                    <span>{project.members} участников</span>
                    <span>{project.tasks} задач</span>
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]} ${viewMode === 'grid' ? 'mt-3 inline-block' : ''}`}>
                {statusLabels[project.status]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Проекты не найдены</p>
        </div>
      )}
    </div>
  );
}

