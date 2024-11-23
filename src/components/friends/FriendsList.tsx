import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Friend } from '../../types';

interface FriendsListProps {
  friends: Friend[];
  currentUser: {
    avatar: string;
    isSelected: boolean;
  };
  onFriendClick: (id: string) => void;
  onSettingsClick: () => void;
}

export const FriendsList = ({ 
  friends, 
  currentUser,
  onFriendClick,
  onSettingsClick
}: FriendsListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 px-2">
      {/* Current User Avatar */}
      <Avatar
        src={currentUser.avatar}
        name="You"
        state={currentUser.isSelected ? 'selected' : 'default'}
        onClick={() => onFriendClick('you')}
      />

      {/* Friends Avatars */}
      {friends.map((friend) => (
        <Avatar
          key={friend.id}
          src={friend.avatar}
          name={friend.name}
          state={friend.isSelected ? 'selected' : 'default'}
          onClick={() => onFriendClick(friend.id)}
        />
      ))}

      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSettingsClick}
        className="flex flex-col items-center gap-1 min-w-[64px]"
      >
        <div className="p-1">
          <div className="w-16 h-16 rounded-full bg-[#362007]/10 flex items-center justify-center hover:bg-[#362007]/20 transition-colors">
            <Settings className="w-6 h-6 text-[#362007]" />
          </div>
        </div>
        <span className="text-xs font-medium">Settings</span>
      </motion.button>
    </div>
  );
};