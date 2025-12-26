import { Users, Plus, Search, UserPlus, Settings, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const demoTeams = [
  {
    id: 1,
    name: 'Core Team',
    description: 'Основная команда разработки',
    members: [
      { id: 1, name: 'Алексей', role: 'Lead', avatar: 'A' },
      { id: 2, name: 'Мария', role: 'Developer', avatar: 'M' },
      { id: 3, name: 'Дмитрий', role: 'Designer', avatar: 'D' },
    ],
    projects: 3,
  },
  {
    id: 2,
    name: 'Mobile Team',
    description: 'Разработка мобильных приложений',
    members: [
      { id: 4, name: 'Анна', role: 'Lead', avatar: 'A' },
      { id: 5, name: 'Павел', role: 'iOS Dev', avatar: 'P' },
    ],
    projects: 2,
  },
  {
    id: 3,
    name: 'QA Team',
    description: 'Тестирование и контроль качества',
    members: [
      { id: 6, name: 'Елена', role: 'QA Lead', avatar: 'E' },
    ],
    projects: 5,
  },
];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = demoTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Users className="text-accent" />
            Команды
          </h1>
          <p className="text-text-muted mt-1">Управление командами и участниками</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Создать команду
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Поиск команд..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map(team => (
          <div key={team.id} className="bg-surface border border-border rounded-xl p-5 hover:shadow-lg transition-all">
            {/* Team Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-500 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <button className="p-1.5 hover:bg-surface-2 rounded-lg text-text-muted transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Team Info */}
            <h3 className="font-semibold text-text-primary text-lg">{team.name}</h3>
            <p className="text-sm text-text-muted mt-1">{team.description}</p>

            {/* Members Avatars */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-2">
                {team.members.slice(0, 4).map(member => (
                  <div
                    key={member.id}
                    className="w-8 h-8 bg-accent/20 border-2 border-surface rounded-full flex items-center justify-center text-xs font-semibold text-accent"
                    title={`${member.name} - ${member.role}`}
                  >
                    {member.avatar}
                  </div>
                ))}
                {team.members.length > 4 && (
                  <div className="w-8 h-8 bg-surface-2 border-2 border-surface rounded-full flex items-center justify-center text-xs font-medium text-text-muted">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
              <span className="text-sm text-text-muted ml-2">
                {team.members.length} участник{team.members.length === 1 ? '' : team.members.length < 5 ? 'а' : 'ов'}
              </span>
            </div>

            {/* Stats & Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-sm text-text-muted">
                {team.projects} проект{team.projects === 1 ? '' : team.projects < 5 ? 'а' : 'ов'}
              </span>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-accent/10 hover:text-accent rounded-lg text-text-muted transition-colors" title="Добавить участника">
                  <UserPlus size={16} />
                </button>
                <button className="p-1.5 hover:bg-surface-2 rounded-lg text-text-muted transition-colors" title="Настройки">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Команды не найдены</p>
        </div>
      )}
    </div>
  );
}

