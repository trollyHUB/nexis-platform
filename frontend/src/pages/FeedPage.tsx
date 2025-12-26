import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postsService, type Post } from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { Loader2, RefreshCw } from 'lucide-react';

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadFeed = async (pageNum = 0, refresh = false) => {
    try {
      if (refresh) setIsRefreshing(true);

      const response = await postsService.getFeed(pageNum, 20);

      if (pageNum === 0) {
        setPosts(response.content);
      } else {
        setPosts(prev => [...prev, ...response.content]);
      }

      setHasMore(response.content.length === 20);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to load feed:', error);
      alert('Не удалось загрузить ленту');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostDeleted = (uuid: string) => {
    setPosts(prev => prev.filter(post => post.uuid !== uuid));
  };

  const handleRefresh = () => {
    loadFeed(0, true);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadFeed(page + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
          <p className="text-gray-500 dark:text-gray-400">Загрузка ленты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Лента
        </h1>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          title="Обновить"
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Post Form */}
      <PostForm onPostCreated={handlePostCreated} />

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Пока нет постов
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Будьте первым, кто создаст пост!
            </p>
          </div>
        ) : (
          <>
            {posts.map(post => (
              <PostCard
                key={post.uuid}
                post={post}
                onDelete={handlePostDeleted}
                currentUserUuid={user?.uuid}
              />
            ))}

            {/* Load More */}
            {hasMore && (
              <div className="text-center py-4">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Загрузка...' : 'Загрузить ещё'}
                </button>
              </div>
            )}

            {!hasMore && posts.length > 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Вы просмотрели все посты
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

