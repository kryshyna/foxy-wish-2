import { ReactNode } from 'react';
import { FriendsList } from '../friends/FriendsList';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
  friends: Array<{
    id: string;
    name: string;
    avatar: string;
    isSelected?: boolean;
  }>;
  currentUser: {
    avatar: string;
    isSelected: boolean;
  };
  onFriendClick: (id: string) => void;
  onInviteClick: () => void;
  onSettingsClick: () => void;
  showWishlist: boolean;
  showIdeas: boolean;
  onToggleWishlist: () => void;
  onToggleIdeas: () => void;
  onAddWish: () => void;
}

export const MainLayout = ({
  children,
  friends,
  currentUser,
  onFriendClick,
  onInviteClick,
  onSettingsClick,
  showWishlist,
  showIdeas,
  onToggleWishlist,
  onToggleIdeas,
  onAddWish
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col h-screen">
      <div className="p-4">
        <FriendsList
          friends={friends}
          currentUser={currentUser}
          onFriendClick={onFriendClick}
          onInviteClick={onInviteClick}
          onSettingsClick={onSettingsClick}
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 px-4 min-h-0">
        {children}
      </div>

      <Navigation
        showWishlist={showWishlist}
        showIdeas={showIdeas}
        onToggleWishlist={onToggleWishlist}
        onToggleIdeas={onToggleIdeas}
        onAddWish={onAddWish}
      />
    </div>
  );
};