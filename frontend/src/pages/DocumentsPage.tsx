import { FileText, Plus, Search, Folder, MoreHorizontal, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

const demoDocuments = [
  { id: 1, name: 'Техническое задание.docx', type: 'doc', size: '245 KB', modified: '2 дня назад', folder: null },
  { id: 2, name: 'Презентация проекта.pptx', type: 'ppt', size: '1.2 MB', modified: '5 дней назад', folder: null },
  { id: 3, name: 'Финансовый отчёт.xlsx', type: 'xls', size: '890 KB', modified: '1 неделю назад', folder: null },
  { id: 4, name: 'README.md', type: 'md', size: '12 KB', modified: '3 дня назад', folder: null },
  { id: 5, name: 'Дизайн макеты.fig', type: 'fig', size: '5.4 MB', modified: '1 день назад', folder: null },
];

const demoFolders = [
  { id: 1, name: 'Проекты', items: 12 },
  { id: 2, name: 'Документация', items: 8 },
  { id: 3, name: 'Изображения', items: 45 },
  { id: 4, name: 'Архив', items: 23 },
];

const typeIcons: Record<string, string> = {
  doc: '📄',
  ppt: '📊',
  xls: '📈',
  md: '📝',
  fig: '🎨',
  pdf: '📕',
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredDocs = demoDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <FileText className="text-accent" />
            Документы
          </h1>
          <p className="text-text-muted mt-1">Управление файлами и документами</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:bg-surface-2 rounded-lg font-medium text-text-secondary transition-colors">
            <Folder size={18} />
            Новая папка
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
            <Plus size={18} />
            Загрузить
          </button>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Поиск документов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        {selectedItems.length > 0 && (
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              <Download size={18} />
              Скачать ({selectedItems.length})
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors">
              <Trash2 size={18} />
              Удалить
            </button>
          </div>
        )}
      </div>

      {/* Folders */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-text-muted mb-3">Папки</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {demoFolders.map(folder => (
            <div
              key={folder.id}
              className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg hover:shadow-md hover:border-accent/30 transition-all cursor-pointer"
            >
              <Folder size={24} className="text-accent" />
              <div className="overflow-hidden">
                <p className="font-medium text-text-primary truncate text-sm">{folder.name}</p>
                <p className="text-xs text-text-muted">{folder.items} файлов</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h2 className="text-sm font-medium text-text-muted mb-3">Файлы</h2>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-2">
              <tr>
                <th className="w-10 p-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredDocs.length}
                    onChange={() => {
                      if (selectedItems.length === filteredDocs.length) {
                        setSelectedItems([]);
                      } else {
                        setSelectedItems(filteredDocs.map(d => d.id));
                      }
                    }}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-3 text-sm font-medium text-text-muted">Название</th>
                <th className="text-left p-3 text-sm font-medium text-text-muted hidden sm:table-cell">Размер</th>
                <th className="text-left p-3 text-sm font-medium text-text-muted hidden md:table-cell">Изменён</th>
                <th className="w-10 p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="border-t border-border hover:bg-surface-2 transition-colors">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{typeIcons[doc.type] || '📄'}</span>
                      <span className="font-medium text-text-primary">{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-text-muted hidden sm:table-cell">{doc.size}</td>
                  <td className="p-3 text-sm text-text-muted hidden md:table-cell">{doc.modified}</td>
                  <td className="p-3">
                    <button className="p-1.5 hover:bg-surface-2 rounded-lg text-text-muted transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Документы не найдены</p>
        </div>
      )}
    </div>
  );
}

