import { motion } from 'framer-motion';
import { Wish } from '../../types';

interface WishCardProps extends Partial<Wish> {
  onClick?: () => void;
}

export const WishCard = ({ 
  image, 
  title, 
  price, 
  currency, 
  isBooked, 
  onClick 
}: WishCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-[170px] min-w-[170px] max-w-[200px] h-[170px] min-h-[170px] max-h-[200px] p-2 bg-white border border-white rounded-[20px] relative cursor-pointer"
    >
      <div className="w-full h-full relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover rounded-[12px]"
        />
        
        {isBooked && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Booked
          </div>
        )}
      </div>
    </motion.div>
  );
};