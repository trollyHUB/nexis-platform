import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Smile,
  Send,
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  saved: boolean;
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Alex Developer', username: 'alexdev', verified: true },
    content: 'Только что закончил работу над новым проектом на React + TypeScript! 🚀 Невероятно, как современные инструменты ускоряют разработку. #webdev #react #typescript',
    likes: 128,
    comments: 24,
    shares: 12,
    liked: false,
    saved: false,
    createdAt: '2 часа назад',
  },
  {
    id: '2',
    author: { name: 'Maria Design', username: 'mariaui' },
    content: 'Дизайн-система NEXIS выглядит потрясающе! Минималистичный подход и отличная цветовая палитра. Кто-нибудь уже пробовал интегрировать в свои проекты?',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    likes: 256,
    comments: 45,
    shares: 32,
    liked: true,
    saved: true,
    createdAt: '5 часов назад',
  },
  {
    id: '3',
    author: { name: 'John Tech', username: 'johntech', verified: true },
    content: 'Совет дня: Всегда документируйте свой код. Будущий вы скажет спасибо! 📝\n\nКакие инструменты для документации вы используете?',
    likes: 89,
    comments: 67,
    shares: 8,
    liked: false,
    saved: false,
    createdAt: 'Вчера',
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleSave = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: { name: 'You', username: 'you' },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        saved: false,
        createdAt: 'Только что',
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Create Post */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">Y</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Что нового?"
              className="w-full bg-transparent border-none outline-none text-text-primary placeholder-text-muted resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                  <Image size={20} />
                </button>
                <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                  <Smile size={20} />
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!newPost.trim()}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={16} />
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => toggleLike(post.id)}
            onSave={() => toggleSave(post.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  onLike,
  onSave
}: {
  post: Post;
  onLike: () => void;
  onSave: () => void;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-accent font-semibold">{post.author.name[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-text-primary">{post.author.name}</span>
              {post.author.verified && (
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-text-muted">@{post.author.username} · {post.createdAt}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-text-primary whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt=""
            className="w-full rounded-xl object-cover max-h-96"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center gap-6">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 transition ${
              post.liked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-text-secondary hover:text-accent transition">
            <MessageCircle size={20} />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-text-secondary hover:text-green-500 transition">
            <Share2 size={20} />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        <button
          onClick={onSave}
          className={`transition ${
            post.saved ? 'text-accent' : 'text-text-secondary hover:text-accent'
          }`}
        >
          <Bookmark size={20} fill={post.saved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}

