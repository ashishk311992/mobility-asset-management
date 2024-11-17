export type Role = 'admin' | 'fleet_manager' | 'finance_manager' | 'driver';

export type Permission =
  | 'view:dashboard'
  | 'view:fleet'
  | 'manage:fleet'
  | 'view:maintenance'
  | 'manage:maintenance'
  | 'view:finance'
  | 'manage:finance'
  | 'view:documents'
  | 'manage:documents'
  | 'view:team'
  | 'manage:team'
  | 'view:settings'
  | 'manage:settings';

export interface UserPermissions {
  role: Role;
  permissions: Permission[];
}

export const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'view:dashboard',
    'view:fleet',
    'manage:fleet',
    'view:maintenance',
    'manage:maintenance',
    'view:finance',
    'manage:finance',
    'view:documents',
    'manage:documents',
    'view:team',
    'manage:team',
    'view:settings',
    'manage:settings'
  ],
  fleet_manager: [
    'view:dashboard',
    'view:fleet',
    'manage:fleet',
    'view:maintenance',
    'manage:maintenance',
    'view:documents',
    'manage:documents',
    'view:team'
  ],
  finance_manager: [
    'view:dashboard',
    'view:fleet',
    'view:finance',
    'manage:finance',
    'view:documents',
    'manage:documents',
    'view:team'
  ],
  driver: [
    'view:dashboard',
    'view:fleet',
    'view:maintenance',
    'view:documents'
  ]
};