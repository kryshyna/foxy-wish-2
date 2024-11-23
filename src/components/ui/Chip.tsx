import { motion } from 'framer-motion';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const Chip = ({ 
  label, 
  selected = false, 
  onClick,
  size = 'md'
}: ChipProps) => {
  const sizeClasses = {
    sm: 'h-[26px] px-3 text-xs',
    md: 'h-[32px] px-4 text-sm'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        ${sizeClasses[size]} rounded-full font-medium
        transition-colors duration-200
        ${selected 
          ? 'bg-black text-white' 
          : 'bg-[#362007]/10 text-[#362007] hover:bg-[#362007]/20'
        }
      `}
    >
      {label}
    </motion.button>
  );
};