import { useState } from 'react';
import { avatars } from '../assets/avatars';
import { useUser } from './useUser';

export function useSettings() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { updateUser } = useUser();

  const handleSaveSettings = (data: { 
    username: string; 
    email: string; 
    password?: string;
    avatar: string;
  }) => {
    // Update user data including the avatar
    updateUser({
      username: data.username,
      email: data.email,
      avatar: data.avatar
    });
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out');
    // In a real app, we would clear the auth token and redirect to login
  };

  return {
    isSettingsOpen,
    setIsSettingsOpen,
    handleSaveSettings,
    handleLogout,
  };
}