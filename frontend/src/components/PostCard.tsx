import { useState } from 'react';
import { Heart, Trash2, MessageCircle } from 'lucide-react';
import type { Post } from '../services/api';
import { postsService } from '../services/api';

interface PostCardProps {
  post: Post;
  onDelete?: (uuid: string) => void;
  currentUserUuid?: string;
}

export default function PostCard({ post, onDelete, currentUserUuid }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isDeleting, setIsDeleting] = useState(false);

  const isMyPost = currentUserUuid === post.author.uuid;

  const handleLike = async () => {
    try {
      const result = await postsService.likePost(post.uuid);
      setIsLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить этот пост?')) return;

    setIsDeleting(true);
    try {
      await postsService.deletePost(post.uuid);
      onDelete?.(post.uuid);
    } catch (error) {
      console.error('Failed to delete post:', error);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'только что';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} д назад`;

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {post.author.firstName?.[0] || post.author.username[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {post.author.fullName || post.author.username}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {isMyPost && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Удалить пост"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            isLiked
              ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium">{likesCount}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{post.commentsCount}</span>
        </button>
      </div>
    </div>
  );
}

