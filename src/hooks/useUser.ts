import { create } from 'zustand';
import { avatars } from '../assets/avatars';

interface UserState {
  username: string;
  email: string;
  avatar: string;
  updateUser: (data: Partial<{ username: string; email: string; avatar: string }>) => void;
}

export const useUser = create<UserState>()((set) => ({
  username: 'You',
  email: 'you@example.com',
  avatar: avatars.fox,
  updateUser: (data) => set((state) => ({ ...state, ...data })),
}));