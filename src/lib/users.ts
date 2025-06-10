import type { User } from '@/types';

export const mockUsers: (User & { password?: string })[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    password: 'password123',
  },
];
