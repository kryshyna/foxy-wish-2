import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { WishlistSection } from './components/sections/WishlistSection';
import { IdeasSection } from './components/sections/IdeasSection';
import { AddWishModal } from './components/wish/AddWishModal';
import { EditWishlistModal } from './components/wishlist/EditWishlistModal';
import { ShareWishlistModal } from './components/wishlist/ShareWishlistModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { WishDetailsModal } from './components/wish/WishDetailsModal';
import { MOCK_LISTS, MOCK_WISHES_BY_LIST, MOCK_CATEGORIES, MOCK_IDEAS, MOCK_FRIENDS } from './data/mock';
import { useUser } from './hooks/useUser';
import { avatars } from './assets/avatars';

export default function App() {
  // Visibility states for desktop
  const [showWishlist, setShowWishlist] = useState(true);
  const [showIdeas, setShowIdeas] = useState(true);
  
  // Mobile visibility state
  const [activeSection, setActiveSection] = useState<'wishlist' | 'ideas'>('wishlist');
  
  // Modal states
  const [isAddWishOpen, setIsAddWishOpen] = useState(false);
  const [isEditListOpen, setIsEditListOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Selection states
  const [selectedList, setSelectedList] = useState(MOCK_LISTS[0].id);
  const [selectedWish, setSelectedWish] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(MOCK_CATEGORIES[0].id);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const user = useUser();

  // Handle mobile/desktop visibility
  const isMobile = window.innerWidth < 768;
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (!newIsMobile) {
        setShowWishlist(true);
        setShowIdeas(true);
      } else {
        setShowWishlist(activeSection === 'wishlist');
        setShowIdeas(activeSection === 'ideas');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // Handle navigation clicks for mobile
  const handleToggleWishlist = () => {
    if (isMobile) {
      setActiveSection('wishlist');
      setShowWishlist(true);
      setShowIdeas(false);
    } else {
      setShowWishlist(!showWishlist);
    }
  };

  const handleToggleIdeas = () => {
    if (isMobile) {
      setActiveSection('ideas');
      setShowWishlist(false);
      setShowIdeas(true);
    } else {
      setShowIdeas(!showIdeas);
    }
  };

  // Get current friend's wishlists or user's wishlists
  const currentFriend = MOCK_FRIENDS.find(f => f.id === selectedFriend);
  const currentLists = currentFriend?.wishlists || MOCK_LISTS;
  const currentWishes = MOCK_WISHES_BY_LIST[selectedList] || [];

  // Handle friend selection
  const handleFriendClick = (friendId: string) => {
    if (friendId === 'you') {
      setSelectedFriend(null);
      setSelectedList(MOCK_LISTS[0].id);
    } else {
      const friend = MOCK_FRIENDS.find(f => f.id === friendId);
      setSelectedFriend(friendId);
      if (friend?.wishlists?.[0]) {
        setSelectedList(friend.wishlists[0].id);
      }
    }
  };

  // Current user with selection state
  const currentUser = {
    avatar: user.avatar,
    isSelected: !selectedFriend
  };

  // Friends with selection state
  const friendsWithState = MOCK_FRIENDS.map(friend => ({
    ...friend,
    isSelected: friend.id === selectedFriend
  }));

  return (
    <MainLayout
      friends={friendsWithState}
      currentUser={currentUser}
      onFriendClick={handleFriendClick}
      onInviteClick={() => setIsShareOpen(true)}
      onSettingsClick={() => setIsSettingsOpen(true)}
      showWishlist={showWishlist}
      showIdeas={showIdeas}
      onToggleWishlist={handleToggleWishlist}
      onToggleIdeas={handleToggleIdeas}
      onAddWish={() => setIsAddWishOpen(true)}
    >
      <WishlistSection
        lists={currentLists}
        selectedList={selectedList}
        onListChange={setSelectedList}
        wishes={currentWishes}
        onWishClick={setSelectedWish}
        onCreateList={() => setIsEditListOpen(true)}
        onShare={() => setIsShareOpen(true)}
        onMore={() => {}}
        visible={showWishlist}
        isViewingFriend={!!selectedFriend}
        onUnsubscribeFriend={(friendId) => {
          setSelectedFriend(null);
          setSelectedList(MOCK_LISTS[0].id);
        }}
        onUnsubscribeWishlist={(wishlistId) => {
          const friend = MOCK_FRIENDS.find(f => f.id === selectedFriend);
          if (friend?.wishlists?.[0]) {
            setSelectedList(friend.wishlists[0].id);
          }
        }}
      />

      <IdeasSection
        visible={showIdeas}
        onClose={() => isMobile ? handleToggleWishlist() : setShowIdeas(false)}
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        ideas={MOCK_IDEAS}
        onAddToWishlist={() => {}}
      />

      {/* Modals */}
      <AddWishModal
        isOpen={isAddWishOpen}
        onClose={() => setIsAddWishOpen(false)}
        onAdd={() => {}}
        selectedList={currentLists.find(list => list.id === selectedList)}
      />

      <EditWishlistModal
        isOpen={isEditListOpen}
        onClose={() => setIsEditListOpen(false)}
        onSave={() => {}}
      />

      <ShareWishlistModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        wishlist={currentLists.find(list => list.id === selectedList)}
        onVisibilityChange={() => {}}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={{
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }}
        onSave={user.updateUser}
        onLogout={() => {}}
      />

      <WishDetailsModal
        isOpen={!!selectedWish}
        onClose={() => setSelectedWish(null)}
        wish={currentWishes.find(w => w.id === selectedWish)}
        similarProducts={[]}
        onAddToWishlist={() => {}}
        isViewingFriend={!!selectedFriend}
        onBook={() => {}}
      />
    </MainLayout>
  );
}