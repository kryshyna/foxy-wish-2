import { motion } from 'framer-motion';
import { ActionButtons } from '../ui/ActionButtons';

interface HeaderProps {
  username: string;
  avatar: string;
  listCount: number;
  wishCount: number;
  isViewingFriend?: boolean;
  onEdit: () => void;
  onShare: () => void;
  onIdeas: () => void;
  onDelete: () => void;
  onSettings: () => void;
}

export const Header = ({
  username,
  avatar,
  listCount,
  wishCount,
  isViewingFriend,
  onEdit,
  onShare,
  onIdeas,
  onDelete,
  onSettings,
}: HeaderProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50">
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{username}</h2>
            {isViewingFriend ? (
              <p className="text-sm text-gray-600">Friend's wishes</p>
            ) : (
              <p className="text-sm text-gray-600">
                {listCount} list{listCount !== 1 && 's'}, {wishCount} wish{wishCount !== 1 && 'es'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <ActionButtons
            variant={isViewingFriend ? 'friend' : 'user'}
            onEdit={!isViewingFriend ? onEdit : undefined}
            onShare={!isViewingFriend ? onShare : undefined}
            onIdeas={!isViewingFriend ? onIdeas : undefined}
            onDelete={onDelete}
            onSettings={!isViewingFriend ? onSettings : undefined}
            onLogout={!isViewingFriend ? () => {} : undefined}
          />
        </div>
      </div>
    </div>
  );
};