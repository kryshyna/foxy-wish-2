import { useState } from 'react';
import { MOCK_FRIENDS } from '../data/mock';
import { Friend } from '../types';

export function useFriends() {
  const [selectedFriend, setSelectedFriend] = useState('you');
  const [isDeleteFriendOpen, setIsDeleteFriendOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);

  const handleDeleteFriend = () => {
    setFriends(prev => prev.filter(friend => friend.id !== selectedFriend));
    setSelectedFriend('you');
    setIsDeleteFriendOpen(false);
  };

  // Update friends with selected state based on selectedFriend
  const friendsWithSelectedState = friends.map(friend => ({
    ...friend,
    isSelected: friend.id === selectedFriend
  }));

  return {
    selectedFriend,
    isDeleteFriendOpen,
    friends: friendsWithSelectedState,
    setSelectedFriend,
    setIsDeleteFriendOpen,
    handleDeleteFriend,
  };
}