import { Cloud, Upload, Folder, File, HardDrive, Download, Trash2, Share2 } from 'lucide-react';
import { useState } from 'react';

const storageUsed = 42.5; // GB
const storageTotal = 100; // GB

const recentFiles = [
  { id: 1, name: 'project-backup.zip', size: '2.4 GB', type: 'archive', date: '2 часа назад' },
  { id: 2, name: 'design-assets.fig', size: '156 MB', type: 'design', date: '5 часов назад' },
  { id: 3, name: 'presentation.pptx', size: '24 MB', type: 'presentation', date: 'Вчера' },
  { id: 4, name: 'database-dump.sql', size: '890 MB', type: 'database', date: '2 дня назад' },
  { id: 5, name: 'video-tutorial.mp4', size: '1.2 GB', type: 'video', date: '3 дня назад' },
];

const sharedFolders = [
  { id: 1, name: 'Team Resources', items: 45, shared: 5 },
  { id: 2, name: 'Project Assets', items: 128, shared: 3 },
  { id: 3, name: 'Client Files', items: 23, shared: 2 },
];

export default function CloudPage() {
  const [isDragging, setIsDragging] = useState(false);
  const usagePercentage = (storageUsed / storageTotal) * 100;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Cloud className="text-accent" />
            Облако
          </h1>
          <p className="text-text-muted mt-1">Облачное хранилище файлов</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
          <Upload size={18} />
          Загрузить файлы
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          >
            <Cloud size={48} className={`mx-auto mb-4 ${isDragging ? 'text-accent' : 'text-text-muted'}`} />
            <p className="text-text-primary font-medium mb-1">
              Перетащите файлы сюда
            </p>
            <p className="text-sm text-text-muted">
              или нажмите для выбора файлов
            </p>
          </div>

          {/* Recent Files */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-text-primary">Недавние файлы</h3>
            </div>
            <div className="divide-y divide-border">
              {recentFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-4 hover:bg-surface-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <File size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{file.name}</p>
                      <p className="text-xs text-text-muted">{file.size} • {file.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-surface-2 rounded-lg text-text-muted transition-colors" title="Скачать">
                      <Download size={16} />
                    </button>
                    <button className="p-2 hover:bg-surface-2 rounded-lg text-text-muted transition-colors" title="Поделиться">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-text-muted transition-colors" title="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Storage */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <HardDrive size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Хранилище</p>
                <p className="text-sm text-text-muted">{storageUsed} GB / {storageTotal} GB</p>
              </div>
            </div>
            <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePercentage > 90 ? 'bg-red-500' : usagePercentage > 70 ? 'bg-yellow-500' : 'bg-accent'
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <p className="text-xs text-text-muted">
              Использовано {usagePercentage.toFixed(0)}% из доступного места
            </p>
            <button className="w-full mt-4 px-4 py-2 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-sm font-medium text-text-secondary transition-colors">
              Увеличить хранилище
            </button>
          </div>

          {/* Shared Folders */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-4">Общие папки</h3>
            <div className="space-y-3">
              {sharedFolders.map(folder => (
                <div key={folder.id} className="flex items-center justify-between p-2 hover:bg-surface-2 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Folder size={20} className="text-accent" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{folder.name}</p>
                      <p className="text-xs text-text-muted">{folder.items} файлов</p>
                    </div>
                  </div>
                  <div className="flex -space-x-1">
                    {Array(Math.min(folder.shared, 3)).fill(0).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-accent/20 border-2 border-surface rounded-full" />
                    ))}
                    {folder.shared > 3 && (
                      <div className="w-6 h-6 bg-surface-2 border-2 border-surface rounded-full flex items-center justify-center text-xs text-text-muted">
                        +{folder.shared - 3}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-4">Быстрые действия</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center gap-2 p-3 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-text-secondary transition-colors">
                <Folder size={20} />
                <span className="text-xs">Новая папка</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-text-secondary transition-colors">
                <Upload size={20} />
                <span className="text-xs">Загрузить</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-text-secondary transition-colors">
                <Share2 size={20} />
                <span className="text-xs">Поделиться</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-surface-2 hover:bg-accent/10 hover:text-accent rounded-lg text-text-secondary transition-colors">
                <Download size={20} />
                <span className="text-xs">Скачать всё</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

