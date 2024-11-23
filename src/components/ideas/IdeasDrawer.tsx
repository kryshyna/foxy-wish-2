import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { icons } from '../../assets/icons';
import { Category, Idea, Product } from '../../types';

interface IdeasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  ideas: Idea[];
  onAddToWishlist: (product: Product) => void;
}

export const IdeasDrawer = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  ideas,
  onAddToWishlist
}: IdeasDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ideas</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-4">
                {categories.map(category => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    selected={selectedCategory === category.id}
                    onClick={() => onCategoryChange(category.id)}
                  />
                ))}
              </div>

              <div className="space-y-6">
                {ideas.map(idea => (
                  <div key={idea.id} className="bg-gray-50 rounded-[20px] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{idea.title}</h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => idea.products.forEach(p => onAddToWishlist(p))}
                        className="ml-auto text-sm text-primary font-medium hover:text-primary/80"
                      >
                        Add all to wishlist
                      </motion.button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{idea.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {idea.products.map(product => (
                        <motion.div
                          key={product.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white rounded-[20px] overflow-hidden shadow-sm"
                        >
                          <div className="aspect-square">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h5 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h5>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-sm">{product.price}</span>
                                <span className="text-xs text-gray-500">{product.currency}</span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onAddToWishlist(product)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                              >
                                <img 
                                  src={icons.addWishBlack} 
                                  alt="Add to wishlist" 
                                  className="w-4 h-4 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(95%)_saturate(1595%)_hue-rotate(360deg)_brightness(100%)_contrast(106%)]"
                                />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};