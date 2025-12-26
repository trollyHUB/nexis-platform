import axios from 'axios';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

const API_URL = 'http://localhost:8082/api';

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

// Types для постов
export interface Post {
  uuid: string;
  content: string;
  imageUrl: string | null;
  author: User;
  likesCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreatePostRequest {
  content: string;
  imageUrl?: string | null;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}

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

// Posts API
export const postsService = {
  async getFeed(page = 0, size = 20): Promise<PageResponse<Post>> {
    const response = await api.get<PageResponse<Post>>('/posts/feed', {
      params: { page, size },
    });
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  async getPost(uuid: string): Promise<Post> {
    const response = await api.get<Post>(`/posts/${uuid}`);
    return response.data;
  },

  async getUserPosts(userUuid: string, page = 0, size = 20): Promise<PageResponse<Post>> {
    const response = await api.get<PageResponse<Post>>(`/posts/user/${userUuid}`, {
      params: { page, size },
    });
    return response.data;
  },

  async likePost(uuid: string): Promise<{ liked: boolean; likesCount: number }> {
    const response = await api.post<{ liked: boolean; likesCount: number }>(`/posts/${uuid}/like`);
    return response.data;
  },

  async deletePost(uuid: string): Promise<void> {
    await api.delete(`/posts/${uuid}`);
  },
};

export default api;
