import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MoreVertical } from 'lucide-react';
import { Tab } from '../ui/Tab';
import { WishCard } from '../wishlist/WishCard';
import { ContextMenu } from '../ui/ContextMenu';
import { Wish, Wishlist } from '../../types';
import { useUser } from '../../hooks/useUser';

interface WishlistSectionProps {
  lists: Wishlist[];
  selectedList: string;
  onListChange: (id: string) => void;
  wishes: Wish[];
  onWishClick: (id: string) => void;
  onCreateList: () => void;
  onShare: () => void;
  onMore: () => void;
  visible: boolean;
  isViewingFriend?: boolean;
  onUnsubscribeFriend?: (friendId: string) => void;
  onUnsubscribeWishlist?: (wishlistId: string) => void;
}

export const WishlistSection = ({
  lists,
  selectedList,
  onListChange,
  wishes,
  onWishClick,
  onCreateList,
  onShare,
  onMore,
  visible,
  isViewingFriend,
  onUnsubscribeFriend,
  onUnsubscribeWishlist
}: WishlistSectionProps) => {
  const activeList = lists.find(list => list.id === selectedList);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const user = useUser();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    });
  };

  const listAvatar = isViewingFriend ? activeList?.avatar : user.avatar;

  return (
    <motion.div 
      className="flex-1 bg-[#F8F4F4] rounded-[32px] flex flex-col min-h-0 relative overflow-hidden md:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: visible ? undefined : 'none' }}
    >
      {/* Gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute left-1/2 -translate-x-1/2 -top-[200px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ 
          background: activeList?.gradient || 'linear-gradient(69.6deg, #FA9172 3.42%, #E233F1 93.22%)',
          filter: 'blur(50px)'
        }}
      />

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {listAvatar && (
              <img 
                src={listAvatar}
                alt="List avatar"
                className="w-12 h-12 object-contain"
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{activeList?.name}</h2>
              <p className="text-sm text-gray-600">
                {wishes.length} wishes | {activeList?.isPublic ? 'public' : 'private'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isViewingFriend ? (
              <>
                <button 
                  onClick={onShare}
                  className="p-2 hover:bg-[#362007]/20 rounded-full text-[#362007]"
                >
                  <Send className="w-5 h-5" />
                </button>
                <button 
                  onClick={onMore}
                  className="p-2 hover:bg-[#362007]/20 rounded-full text-[#362007]"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={handleContextMenu}
                className="p-2 hover:bg-[#362007]/20 rounded-full text-[#362007]"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {(lists.length > 1 || !isViewingFriend) && (
          <div className="flex gap-2 overflow-x-auto">
            {!isViewingFriend && (
              <Tab
                icon="plus"
                variant="ghost"
                onClick={onCreateList}
              />
            )}
            
            {lists.map(list => (
              <Tab
                key={list.id}
                label={list.name}
                selected={selectedList === list.id}
                onClick={() => onListChange(list.id)}
                gradient={selectedList === list.id ? list.gradient : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Wishes Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-wrap gap-3">
          {wishes.map(wish => (
            <WishCard
              key={wish.id}
              {...wish}
              onClick={() => onWishClick(wish.id)}
            />
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {isViewingFriend && contextMenu && (
        <ContextMenu
          isOpen={!!contextMenu}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={[
            {
              label: 'Unsubscribe Friend',
              onClick: () => {
                onUnsubscribeFriend?.(selectedList);
                setContextMenu(null);
              }
            },
            {
              label: 'Unsubscribe Wishlist',
              onClick: () => {
                onUnsubscribeWishlist?.(selectedList);
                setContextMenu(null);
              }
            }
          ]}
        />
      )}
    </motion.div>
  );
};