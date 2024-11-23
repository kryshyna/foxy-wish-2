import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface DeleteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName: string;
  onDelete: () => void;
}

export const DeleteFriendModal = ({
  isOpen,
  onClose,
  friendName,
  onDelete
}: DeleteFriendModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Friend"
    >
      <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl mb-6">
        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
        <p className="text-gray-600">
          Are you sure you want to remove <span className="font-bold">{friendName}</span> from your friends list? 
          This action cannot be undone.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onDelete}
          className="w-full bg-red-500 text-white font-medium py-3 px-6 rounded-full hover:bg-red-600 transition-colors"
        >
          Yes, Delete Friend
        </button>
        
        <button
          onClick={onClose}
          className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-full hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};