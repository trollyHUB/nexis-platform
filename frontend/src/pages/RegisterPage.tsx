import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Check, X } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError('Пароль не соответствует требованиям');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await register(username, email, password, firstName || undefined, lastName || undefined);
      navigate('/dashboard');
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.details) {
        setError(Object.values(data.details).join('\n'));
      } else {
        setError(data?.message || 'Ошибка регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface border border-border rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Регистрация</h1>
          <p className="text-text-muted mt-2">Создайте новый аккаунт</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Username *</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition"
              placeholder="Минимум 3 символа"
              minLength={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Пароль *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition"
              placeholder="Минимум 8 символов"
              required
            />
            <div className="mt-3 space-y-1">
              <PasswordCheck valid={passwordChecks.length} text="Минимум 8 символов" />
              <PasswordCheck valid={passwordChecks.uppercase} text="Заглавная буква" />
              <PasswordCheck valid={passwordChecks.lowercase} text="Строчная буква" />
              <PasswordCheck valid={passwordChecks.number} text="Цифра" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Имя</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Фамилия</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordCheck({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <X size={14} className="text-text-muted" />
      )}
      <span className={valid ? 'text-green-500' : 'text-text-muted'}>{text}</span>
    </div>
  );
}
