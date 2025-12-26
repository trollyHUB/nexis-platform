import axios from 'axios';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

const API_URL = 'http://localhost:8083/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // TODO: Реализовать на бэкенде
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  // TODO: Реализовать на бэкенде
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  // TODO: Реализовать на бэкенде
  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  },

  // TODO: Реализовать на бэкенде
  async resendVerification(): Promise<void> {
    await api.post('/auth/resend-verification');
  },

  // TODO: Реализовать на бэкенде - OAuth2
  getOAuthUrl(provider: 'google' | 'github' | 'facebook' | 'apple'): string {
    return `${API_URL}/oauth2/authorize/${provider}`;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};

export default api;
