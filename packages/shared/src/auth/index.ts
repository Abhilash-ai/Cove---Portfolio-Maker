export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  user: AuthenticatedUser;
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
}
