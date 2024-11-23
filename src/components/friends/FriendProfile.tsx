import { Friend, Wish } from '../../types';
import { WishCard } from '../wishlist/WishCard';
import { Tab } from '../ui/Tab';
import { motion } from 'framer-motion';

interface FriendProfileProps {
  friend: Friend;
  wishes: Wish[];
  onWishClick: (id: string) => void;
}

export const FriendProfile = ({ friend, wishes, onWishClick }: FriendProfileProps) => {
  if (!friend.wishlist) return null;

  return (
    <div className="px-6 relative">
      {/* Gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute -top-[280px] -right-[100px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: friend.wishlist.gradient, filter: 'blur(50px)' }}
      />

      <div className="flex gap-2 mb-8">
        <Tab
          label={friend.wishlist.name}
          selected={true}
          style={{
            background: friend.wishlist.gradient,
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {wishes.map(wish => (
          <WishCard
            key={wish.id}
            {...wish}
            onClick={() => onWishClick(wish.id)}
          />
        ))}
      </div>
    </div>
  );
};