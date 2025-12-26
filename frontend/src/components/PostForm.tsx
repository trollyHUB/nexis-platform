import { useState } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { postsService } from '../services/api';
import type { Post } from '../services/api';

interface PostFormProps {
  onPostCreated: (post: Post) => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const post = await postsService.createPost({
        content: content.trim(),
        imageUrl: imageUrl.trim() || null,
      });

      onPostCreated(post);
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Не удалось создать пост. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Что у вас нового?"
          className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          rows={3}
          maxLength={5000}
          disabled={isSubmitting}
        />

        {showImageInput && (
          <div className="mt-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="URL изображения (необязательно)"
              className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              disabled={isSubmitting}
            />
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              showImageInput
                ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            disabled={isSubmitting}
          >
            <ImageIcon size={18} />
            <span className="text-sm">Изображение</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {content.length}/5000
            </span>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Публикация...' : 'Опубликовать'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

