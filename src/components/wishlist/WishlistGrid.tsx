import { motion } from 'framer-motion';
import { icons } from '../../assets/icons';
import { Tab } from '../ui/Tab';
import { ProductCard } from '../product/ProductCard';
import { Wishlist, Wish } from '../../types';

interface WishlistGridProps {
  lists: Wishlist[];
  selectedList: string;
  onListChange: (id: string) => void;
  wishes: Wish[];
  onWishClick: (id: string) => void;
  onCreateList: () => void;
}

export const WishlistGrid = ({
  lists,
  selectedList,
  onListChange,
  wishes,
  onWishClick,
  onCreateList
}: WishlistGridProps) => {
  const activeList = lists.find(list => list.id === selectedList);

  return (
    <div className="px-6 relative">
      {/* Gradient background */}
      {activeList?.gradient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="absolute -top-[280px] -right-[100px] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: activeList.gradient, filter: 'blur(50px)' }}
        />
      )}

      <div className="flex gap-2 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateList}
          className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors shrink-0"
        >
          <img src={icons.addNewWishlist} alt="Add new wishlist" className="w-5 h-5" />
        </motion.button>
        
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
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {wishes.map(wish => (
          <ProductCard
            key={wish.id}
            {...wish}
            variant="minimal"
            onClick={() => onWishClick(wish.id)}
          />
        ))}
      </div>
    </div>
  );
};