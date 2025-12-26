import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OAuthButtons, OAuthDivider } from '../components/OAuthButtons';

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(usernameOrEmail, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface border border-border rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">IS</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Вход в систему</h1>
          <p className="text-text-muted mt-2">Identity & Social</p>
        </div>

        {/* OAuth */}
        <OAuthButtons />
        <OAuthDivider />

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Username или Email
            </label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition"
              placeholder="Введите username или email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-text-secondary">Пароль</label>
              <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                Забыли пароль?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition"
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-accent hover:underline font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {/* Test credentials */}
        <div className="mt-4 p-3 bg-surface-2 rounded-lg text-center text-xs text-text-muted">
          Тест: <span className="text-text-secondary font-mono">admin</span> / <span className="text-text-secondary font-mono">Admin123!</span>
        </div>
      </div>
    </div>
  );
}
