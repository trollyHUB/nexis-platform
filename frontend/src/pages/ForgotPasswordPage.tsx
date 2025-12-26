import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Реализовать API запрос на восстановление пароля
      // await authService.forgotPassword(email);

      // Пока просто показываем успех (заглушка)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Письмо отправлено!</h1>
          <p className="text-gray-600 mb-6">
            Если аккаунт с email <strong>{email}</strong> существует,
            мы отправили инструкции по восстановлению пароля.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Вернуться к входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Забыли пароль?</h1>
          <p className="text-gray-500 mt-2">Введите email для восстановления</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Введите ваш email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition disabled:opacity-50"
          >
            {loading ? 'Отправка...' : 'Отправить инструкции'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
            ← Вернуться к входу
          </Link>
        </div>
      </div>
    </div>
  );
}

