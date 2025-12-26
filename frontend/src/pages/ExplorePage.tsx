import { useState } from 'react';
import {
  Search,
  TrendingUp,
  Users,
  Hash,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  category: string;
}

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  bio: string;
  followers: number;
  verified?: boolean;
}

const trendingTopics: TrendingTopic[] = [
  { id: '1', name: '#webdev', posts: 12500, category: 'Технологии' },
  { id: '2', name: '#react', posts: 8900, category: 'Технологии' },
  { id: '3', name: '#design', posts: 7200, category: 'Дизайн' },
  { id: '4', name: '#startup', posts: 5400, category: 'Бизнес' },
  { id: '5', name: '#ai', posts: 15000, category: 'Технологии' },
  { id: '6', name: '#kotlin', posts: 3200, category: 'Технологии' },
];

const suggestedUsers: SuggestedUser[] = [
  { id: '1', name: 'Tech News', username: 'technews', bio: 'Последние новости из мира технологий', followers: 125000, verified: true },
  { id: '2', name: 'Design Daily', username: 'designdaily', bio: 'Ежедневное вдохновение для дизайнеров', followers: 89000, verified: true },
  { id: '3', name: 'Code Tips', username: 'codetips', bio: 'Советы и трюки для разработчиков', followers: 45000 },
  { id: '4', name: 'Startup Hub', username: 'startuphub', bio: 'Всё о стартапах и предпринимательстве', followers: 67000, verified: true },
];

const categories = ['Все', 'Технологии', 'Дизайн', 'Бизнес', 'Наука', 'Спорт'];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredTopics = trendingTopics.filter(topic =>
    activeCategory === 'Все' || topic.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Поиск</h1>
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск людей, тем и постов..."
            className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-accent transition"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
              activeCategory === category
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <TrendingUp size={20} className="text-accent" />
              <h2 className="font-semibold text-text-primary">Популярные темы</h2>
            </div>
            <div className="divide-y divide-border">
              {filteredTopics.map((topic, index) => (
                <div key={topic.id} className="flex items-center gap-4 p-4 hover:bg-surface-2 transition cursor-pointer">
                  <span className="text-2xl font-bold text-text-muted w-8">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Hash size={16} className="text-accent" />
                      <span className="font-semibold text-text-primary">{topic.name.slice(1)}</span>
                    </div>
                    <p className="text-sm text-text-muted">{topic.posts.toLocaleString()} постов · {topic.category}</p>
                  </div>
                  <ArrowRight size={18} className="text-text-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* For You Section */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden mt-6">
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <Sparkles size={20} className="text-accent" />
              <h2 className="font-semibold text-text-primary">Для вас</h2>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Персональные рекомендации</h3>
              <p className="text-text-muted text-sm mb-4">
                Подписывайтесь на интересные темы и людей, чтобы получать персональные рекомендации
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition">
                Настроить интересы
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Users */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-xl overflow-hidden sticky top-6">
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <Users size={20} className="text-accent" />
              <h2 className="font-semibold text-text-primary">Кого читать</h2>
            </div>
            <div className="divide-y divide-border">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-semibold">{user.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-text-primary truncate">{user.name}</span>
                        {user.verified && (
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-text-muted truncate">@{user.username}</p>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{user.bio}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-text-muted">{(user.followers / 1000).toFixed(0)}K подписчиков</span>
                    <button className="px-3 py-1.5 bg-accent text-white text-sm rounded-lg font-medium hover:bg-accent-hover transition">
                      Читать
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button className="w-full text-accent text-sm font-medium hover:underline">
                Показать ещё
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

