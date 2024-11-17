import { create } from 'zustand';
import type { Role, Permission } from '../types/rbac';
import { rolePermissions } from '../types/rbac';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  } | null;
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  login: (userData: { id: string; name: string; email: string; role: Role }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  permissions: [],
  hasPermission: (permission: Permission) => {
    return get().permissions.includes(permission);
  },
  login: (userData) => {
    set({
      isAuthenticated: true,
      user: userData,
      permissions: rolePermissions[userData.role]
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      permissions: []
    });
  }
}));