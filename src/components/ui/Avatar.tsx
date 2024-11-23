import { motion } from 'framer-motion';

interface AvatarProps {
  src: string;
  name: string;
  state?: 'default' | 'selected' | 'notification';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export const Avatar = ({ src, name, state = 'default', size = 'md', onClick }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16'
  };

  const stateClasses = {
    default: 'ring-transparent hover:ring-gray-200',
    selected: 'ring-primary',
    notification: 'ring-pink-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <div className={`p-1`}>
        <div 
          className={`
            ${sizeClasses[size]} rounded-full ring-2 transition-all duration-200
            ${stateClasses[state]}
          `}
        >
          <img
            src={src}
            alt={name}
            className="w-full h-full rounded-full object-contain bg-gray-50"
          />
        </div>
      </div>
      <span className="text-xs font-medium truncate max-w-[64px]">{name}</span>
    </motion.div>
  );
};