export const rolePermissions = {
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