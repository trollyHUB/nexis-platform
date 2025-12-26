export interface User {
  uuid: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  avatarUrl: string | null;
  bio: string | null;
  emailVerified: boolean;
  roles: string[];
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

