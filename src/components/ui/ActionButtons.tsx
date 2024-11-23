import { motion } from 'framer-motion';
import { icons } from '../../assets/icons';

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface ActionButtonsProps {
  variant: 'user' | 'friend';
  onEdit?: () => void;
  onShare?: () => void;
  onIdeas?: () => void;
  onDelete?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors"
  >
    <img src={icon} alt={label} className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

export const ActionButtons = ({
  variant,
  onEdit,
  onShare,
  onIdeas,
  onDelete,
  onSettings,
  onLogout,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      {variant === 'user' ? (
        <>
          {onEdit && <ActionButton icon={icons.edit} label="Edit" onClick={onEdit} />}
          {onShare && <ActionButton icon={icons.share} label="Share" onClick={onShare} />}
          {onIdeas && <ActionButton icon={icons.idea} label="Ideas" onClick={onIdeas} />}
          {onSettings && <ActionButton icon={icons.settings} label="Settings" onClick={onSettings} />}
          {onLogout && <ActionButton icon={icons.logout} label="Log out" onClick={onLogout} />}
        </>
      ) : (
        <>
          {onDelete && <ActionButton icon={icons.delete} label="Delete" onClick={onDelete} />}
        </>
      )}
    </div>
  );
};