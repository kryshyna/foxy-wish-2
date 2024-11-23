import { useState } from 'react';
import { Copy, Globe, Lock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Wishlist } from '../../types';

interface ShareWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist?: Wishlist;
  onVisibilityChange: (isPublic: boolean) => void;
}

export const ShareWishlistModal = ({
  isOpen,
  onClose,
  wishlist,
  onVisibilityChange
}: ShareWishlistModalProps) => {
  const [isPublic, setIsPublic] = useState(wishlist?.isPublic || false);
  const [copied, setCopied] = useState(false);

  if (!wishlist) {
    return null;
  }

  const shareUrl = `https://foxywish.app/wishlist/${wishlist.id}`;

  const handleVisibilityChange = (newValue: boolean) => {
    setIsPublic(newValue);
    onVisibilityChange(newValue);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const actions = isPublic && (
    <button
      onClick={handleCopyLink}
      className="w-full flex items-center justify-center gap-2 bg-[#FF8812] text-white font-medium py-3 px-6 rounded-full hover:bg-[#FF8812]/90 transition-colors"
    >
      <Copy className="w-4 h-4" />
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Wishlist"
      actions={actions}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            Visibility
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleVisibilityChange(false)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-2xl border transition-colors
                ${!isPublic 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-[#362007] border-gray-200 hover:bg-[#362007]/10'
                }
              `}
            >
              <Lock className="w-4 h-4" />
              <span className="font-medium">Private</span>
            </button>
            <button
              onClick={() => handleVisibilityChange(true)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-2xl border transition-colors
                ${isPublic 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-[#362007] border-gray-200 hover:bg-[#362007]/10'
                }
              `}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">Public</span>
            </button>
          </div>
        </div>

        {isPublic && (
          <div className="bg-[#362007]/10 p-4 rounded-2xl break-all">
            <span className="text-sm font-medium">{shareUrl}</span>
          </div>
        )}

        {!isPublic && (
          <div className="bg-[#362007]/10 p-4 rounded-2xl">
            <p className="text-sm text-[#362007]">
              Only you can see this wishlist. Make it public to share with friends.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};