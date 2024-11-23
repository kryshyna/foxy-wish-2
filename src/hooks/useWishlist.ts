import { useState } from 'react';
import { MOCK_LISTS, MOCK_WISHES_BY_LIST, MOCK_WISHES_BY_FRIEND } from '../data/mock';
import { Wish, Wishlist, Product } from '../types';
import { gradients } from '../styles/gradients';

// Helper function to generate unique IDs
const generateUniqueId = () => `wish-${Date.now()}`;

export function useWishlist() {
  const [selectedWish, setSelectedWish] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState('my-wishlist');
  const [isEditListOpen, setIsEditListOpen] = useState(false);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [lists, setLists] = useState<Wishlist[]>(MOCK_LISTS);
  const [wishes, setWishes] = useState<Record<string, Wish[]>>({
    ...MOCK_WISHES_BY_LIST,
    ...MOCK_WISHES_BY_FRIEND
  });

  // Rest of the hook implementation remains the same
  const handleWishClick = (id: string) => setSelectedWish(id);
  
  const handleCloseDrawer = () => {
    setSelectedWish(null);
  };

  const handleListChange = (id: string) => setSelectedList(id);

  const handleDeleteWish = (wishId: string, listId: string) => {
    setWishes(prev => ({
      ...prev,
      [listId]: prev[listId].filter(w => w.id !== wishId)
    }));
    handleCloseDrawer();
  };

  const handleBookWish = (wishId: string, listId: string) => {
    setWishes(prev => ({
      ...prev,
      [listId]: prev[listId].map(w => 
        w.id === wishId ? { ...w, isBooked: !w.isBooked } : w
      )
    }));
  };

  const handleAddWishFromIdeas = (product: Product) => {
    const newWish: Wish = {
      id: generateUniqueId(),
      image: product.image,
      title: product.title,
      price: product.price,
      currency: product.currency,
      isBooked: false
    };

    setWishes(prev => ({
      ...prev,
      [selectedList]: [...(prev[selectedList] || []), newWish]
    }));
  };

  const handleEditList = (data: { name: string; gradient: string }) => {
    if (isCreateListOpen) {
      // Create new wishlist
      const newId = `wishlist-${generateUniqueId()}`;
      const newList: Wishlist = {
        id: newId,
        name: data.name,
        gradient: data.gradient,
        isPublic: false
      };
      setLists(prev => [...prev, newList]);
      setWishes(prev => ({ ...prev, [newId]: [] }));
      setSelectedList(newId);
    } else {
      // Update existing wishlist
      setLists(prev => prev.map(list => 
        list.id === selectedList 
          ? { ...list, ...data }
          : list
      ));
    }
    setIsEditListOpen(false);
    setIsCreateListOpen(false);
  };

  const handleDeleteList = () => {
    setLists(prev => {
      const updatedLists = prev.filter(list => list.id !== selectedList);
      if (updatedLists.length > 0) {
        setSelectedList(updatedLists[0].id);
      }
      return updatedLists;
    });
    
    setWishes(prev => {
      const { [selectedList]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleVisibilityChange = (isPublic: boolean) => {
    setLists(prev => prev.map(list =>
      list.id === selectedList
        ? { ...list, isPublic }
        : list
    ));
  };

  return {
    selectedWish,
    selectedList,
    isEditListOpen,
    isCreateListOpen,
    isShareOpen,
    lists,
    wishes,
    setSelectedWish,
    setSelectedList,
    setIsEditListOpen,
    setIsCreateListOpen,
    setIsShareOpen,
    handleWishClick,
    handleCloseDrawer,
    handleListChange,
    handleEditList,
    handleDeleteList,
    handleVisibilityChange,
    handleDeleteWish,
    handleBookWish,
    handleAddWishFromIdeas,
  };
}