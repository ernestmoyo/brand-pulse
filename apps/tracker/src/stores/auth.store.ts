import { create } from 'zustand';
import type { UserProfile } from '@exotica/shared';

const ADMIN_USER: UserProfile = {
  id: 'admin-001',
  email: 'admin@exotica.mu',
  name: 'Irfan Mooradun',
  role: 'ADMIN',
  organizationId: 'org-exotica',
  organizationName: 'Exotica Agency',
};

interface AuthState {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: true;
  isLoading: false;
}

export const useAuthStore = create<AuthState>()(() => ({
  user: ADMIN_USER,
  accessToken: 'auto-auth-token',
  refreshToken: 'auto-refresh-token',
  isAuthenticated: true,
  isLoading: false,
}));
