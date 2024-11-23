import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Wishlist } from '../../types';

interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { url: string; name: string; note: string; images: string[] }) => void;
  selectedList?: Wishlist;
}

const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
  'https://images.unsplash.com/photo-1587304947504-bd1505248e2c?w=500',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
];

export const AddWishModal = ({ isOpen, onClose, onAdd, selectedList }: AddWishModalProps) => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState(DEMO_IMAGES[0]);

  const handleNext = () => {
    if (url.trim()) {
      // In a real app, we would scrape the URL here
      setName('Product Name (scraped)');
      setStep(2);
      setSelectedImages(DEMO_IMAGES);
    }
  };

  const handleSubmit = () => {
    onAdd({ url, name, note, images: selectedImages });
    setStep(1);
    setUrl('');
    setName('');
    setNote('');
    setSelectedImages([]);
    onClose();
  };

  const actions = (
    <button
      onClick={step === 1 ? handleNext : handleSubmit}
      disabled={step === 1 ? !url.trim() : !name.trim()}
      className="w-full bg-[#FF8812] text-white font-medium py-3 px-6 rounded-full hover:bg-[#FF8812]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {step === 1 ? 'Next' : 'Add to Wishlist'}
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Wish"
      actions={actions}
    >
      <div className="space-y-6">
        {step === 1 ? (
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-2">
              Paste product link
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
            />
          </div>
        ) : (
          <>
            {selectedImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Images
                </label>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {selectedImages.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setPreviewImage(image)}
                      className={`
                        w-[80px] h-[80px] shrink-0 rounded-2xl overflow-hidden border-2 transition-colors
                        ${image === previewImage 
                          ? 'border-[#FF8812] bg-[#FF8812]/5' 
                          : 'border-transparent hover:bg-[#362007]/10'
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Product name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-2">
                Add a note (optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812] resize-none"
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};