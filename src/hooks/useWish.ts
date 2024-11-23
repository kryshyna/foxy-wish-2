import { useState } from 'react';

export function useWish() {
  const [isAddWishOpen, setIsAddWishOpen] = useState(false);

  const handleAddWish = (data: { url: string; name: string; note: string }) => {
    console.log('Adding wish:', data);
    // In a real app, we would add the wish to the database
  };

  return {
    isAddWishOpen,
    setIsAddWishOpen,
    handleAddWish,
  };
}