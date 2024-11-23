import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { gradients } from '../../styles/gradients';

interface EditWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist?: {
    id: string;
    name: string;
    gradient?: string;
  };
  onSave: (data: { name: string; gradient: string }) => void;
  onDelete?: () => void;
}

const GRADIENTS = [
  { id: 'gradient1', value: gradients.gradient1, label: 'Sunset Rose' },
  { id: 'gradient2', value: gradients.gradient2, label: 'Ocean Dream' },
  { id: 'gradient3', value: gradients.gradient3, label: 'Fire Dawn' },
  { id: 'gradient4', value: gradients.gradient4, label: 'Spring Forest' },
  { id: 'gradient5', value: gradients.gradient5, label: 'Pink Gold' },
  { id: 'gradient6', value: gradients.gradient6, label: 'Blue Rose' }
];

export const EditWishlistModal = ({ 
  isOpen, 
  onClose, 
  wishlist,
  onSave,
  onDelete 
}: EditWishlistModalProps) => {
  const [name, setName] = useState(wishlist?.name || '');
  const [gradient, setGradient] = useState(wishlist?.gradient || GRADIENTS[0].value);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isEditing = !!wishlist;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(wishlist?.name || '');
      setGradient(wishlist?.gradient || GRADIENTS[0].value);
      setShowDeleteConfirm(false);
    }
  }, [isOpen, wishlist]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, gradient });
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  const actions = !showDeleteConfirm ? (
    <div className="space-y-3">
      <button
        onClick={handleSave}
        disabled={!name.trim()}
        className="w-full bg-[#FF8812] text-white font-medium py-3 px-6 rounded-full hover:bg-[#FF8812]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEditing ? 'Save Changes' : 'Create Wishlist'}
      </button>
      
      {isEditing && onDelete && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full flex items-center justify-center gap-2 text-red-500 font-medium py-3 px-6 rounded-full hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Wishlist
        </button>
      )}
    </div>
  ) : (
    <div className="space-y-3">
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white font-medium py-3 px-6 rounded-full hover:bg-red-600 transition-colors"
      >
        Yes, Delete Wishlist
      </button>
      <button
        onClick={() => setShowDeleteConfirm(false)}
        className="w-full bg-[#362007]/10 text-[#362007] font-medium py-3 px-6 rounded-full hover:bg-[#362007]/20 transition-colors"
      >
        Cancel
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Wishlist' : 'Create Wishlist'}
      actions={actions}
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Wishlist name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter wishlist name"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Gradient Theme
          </label>
          <div className="grid grid-cols-6 gap-4">
            {GRADIENTS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGradient(g.value)}
                className={`
                  group relative w-10 h-10 rounded-full transition-transform
                  ${gradient === g.value ? 'ring-2 ring-offset-2 ring-black scale-110' : ''}
                `}
                style={{ background: g.value }}
                title={g.label}
              />
            ))}
          </div>
        </div>

        {showDeleteConfirm && (
          <p className="text-center text-gray-600">
            Are you sure you want to delete this wishlist? This action cannot be undone.
          </p>
        )}
      </div>
    </Modal>
  );
};