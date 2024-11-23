import { motion } from 'framer-motion';
import { Gift, Plus, Lightbulb } from 'lucide-react';

interface NavigationProps {
  showWishlist: boolean;
  showIdeas: boolean;
  onToggleWishlist: () => void;
  onToggleIdeas: () => void;
  onAddWish: () => void;
}

export const Navigation = ({
  showWishlist,
  showIdeas,
  onToggleWishlist,
  onToggleIdeas,
  onAddWish
}: NavigationProps) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center">
      <motion.div 
        className="flex items-center gap-4 p-2 rounded-full bg-white shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <button
          onClick={onToggleWishlist}
          className={`w-12 h-12 rounded-[32px] flex items-center justify-center transition-colors
            ${showWishlist ? 'bg-[#FF8812] text-white shadow-[0px_28px_17px_rgba(255,136,18,0.1),0px_12px_12px_rgba(255,136,18,0.15),0px_3px_7px_rgba(255,136,18,0.15)]' : 'bg-[#362007]/10 text-[#362007] hover:bg-[#362007]/20'}`}
        >
          <Gift className="w-5 h-5" />
        </button>

        <button
          onClick={onAddWish}
          className="h-12 px-6 rounded-[32px] bg-[#FF8812] text-white flex items-center gap-2 shadow-[0px_28px_17px_rgba(255,136,18,0.1),0px_12px_12px_rgba(255,136,18,0.15),0px_3px_7px_rgba(255,136,18,0.15)]"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New wish</span>
        </button>

        <button
          onClick={onToggleIdeas}
          className={`w-12 h-12 rounded-[32px] flex items-center justify-center transition-colors
            ${showIdeas ? 'bg-[#FF8812] text-white shadow-[0px_28px_17px_rgba(255,136,18,0.1),0px_12px_12px_rgba(255,136,18,0.15),0px_3px_7px_rgba(255,136,18,0.15)]' : 'bg-[#362007]/10 text-[#362007] hover:bg-[#362007]/20'}`}
        >
          <Lightbulb className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};