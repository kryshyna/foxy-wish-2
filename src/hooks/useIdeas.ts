import { useState } from 'react';

export function useIdeas() {
  const [isIdeasOpen, setIsIdeasOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('birthday');

  const handleIdeasToggle = () => setIsIdeasOpen(!isIdeasOpen);
  const handleClose = () => setIsIdeasOpen(false);

  return {
    isIdeasOpen,
    selectedCategory,
    handleIdeasToggle,
    handleClose,
    setSelectedCategory,
  };
}