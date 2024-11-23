import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface TabProps {
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: 'plus';
  variant?: 'default' | 'ghost';
  gradient?: string;
}

export const Tab = ({ 
  label, 
  selected = false, 
  onClick, 
  icon,
  variant = 'default',
  gradient
}: TabProps) => {
  if (variant === 'ghost') {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-[#362007]/10 flex items-center justify-center hover:bg-[#362007]/20 transition-colors shrink-0"
      >
        <Plus className="w-5 h-5 text-[#362007]" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        px-4 h-10 rounded-full flex items-center gap-2 font-medium whitespace-nowrap transition-all
        ${selected
          ? gradient 
            ? 'text-white shadow-sm' 
            : 'bg-white shadow-sm text-black'
          : 'bg-[#362007]/10 text-[#362007] hover:bg-[#362007]/20'
        }
      `}
      style={gradient && selected ? { background: gradient } : undefined}
    >
      {label}
    </motion.button>
  );
};