import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { ProductCard } from '../product/ProductCard';
import { Product } from '../../types';

interface IdeasSectionProps {
  visible: boolean;
  onClose: () => void;
  categories: Array<{ id: string; name: string }>;
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  ideas: Array<{
    id: string;
    title: string;
    description: string;
    products: Product[];
  }>;
  onAddToWishlist: (product: Product) => void;
}

export const IdeasSection = ({
  visible,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  ideas,
  onAddToWishlist
}: IdeasSectionProps) => {
  if (!visible) return null;

  return (
    <motion.div 
      className="flex-1 bg-[#F8F4F4] rounded-[32px] flex flex-col min-h-0 relative overflow-hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{ display: visible ? undefined : 'none' }}
    >
      {/* Gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute left-1/2 -translate-x-1/2 -top-[200px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ 
          background: 'linear-gradient(69.6deg, #72F5FA 3.42%, #6F33F1 93.22%)',
          filter: 'blur(50px)'
        }}
      />

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎁</span>
            <div>
              <h2 className="text-xl font-bold">Ideas</h2>
              <p className="text-sm text-gray-600">
                Search bunch of ideas for you and your family
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#362007]/20 rounded-full text-[#362007]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Chip
              key={category.id}
              label={category.name}
              selected={selectedCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Ideas */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-8">
          {ideas.map(idea => (
            <div key={idea.id} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {idea.title}
                  <span className="text-2xl">✨</span>
                </h3>
                <p className="text-gray-600">{idea.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {idea.products.map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAdd={() => onAddToWishlist(product)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};