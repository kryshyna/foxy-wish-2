import { motion } from 'framer-motion';
import { icons } from '../../assets/icons';

interface AddWishButtonProps {
  onClick: () => void;
}

export const AddWishButton = ({ onClick }: AddWishButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed right-6 bottom-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
    >
      <img 
        src={icons.addWish} 
        alt="Add wish" 
        className="w-6 h-6 brightness-0 invert" // This will make the icon white
      />
    </motion.button>
  );
};