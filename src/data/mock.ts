import { Wish, Wishlist, Friend, Category, Idea } from '../types';
import { avatars } from '../assets/avatars';
import { gradients } from '../styles/gradients';

export const MOCK_LISTS: Wishlist[] = [
  {
    id: 'my-wishlist',
    name: 'My wishlist',
    gradient: gradients.gradient1,
    isPublic: false,
    avatar: avatars.fox
  },
  {
    id: 'st-nicolas',
    name: '❤️ St. Nicolas',
    gradient: gradients.gradient2,
    isPublic: true,
    avatar: avatars.fox
  },
  {
    id: 'new-year',
    name: 'New Year',
    gradient: gradients.gradient3,
    isPublic: false,
    avatar: avatars.fox
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'baby-1m', name: 'Baby 1 month' },
  { id: 'baby-6m', name: 'Baby 6m' },
  { id: 'baby-1y', name: 'Baby 1 year' },
  { id: 'baby-2y', name: 'Baby 2 years' },
  { id: 'baby-3y', name: 'Baby 3 years' },
  { id: 'baby-4y', name: 'Baby 4 years' }
];

export const MOCK_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    title: 'Laktator',
    description: 'Z własnego doświadczenia polecamy laktator elektryczny, który umożliwia ściąganie pokarmu z obu piersi jednocześnie. Laktator podwójny cechuje się dużą wydajnością i pozwala zaoszczędzić wiele czasu karmiącej mamie.',
    products: [
      {
        id: 'product-1',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
        title: 'PlayStation 5 (PS5) Digital Edition',
        price: '399',
        currency: 'USD'
      },
      {
        id: 'product-2',
        image: 'https://images.unsplash.com/photo-1587304947504-bd1505248e2c?w=500',
        title: 'Dior Sauvage Parfum',
        price: '150',
        currency: 'USD'
      }
    ]
  },
  {
    id: 'idea-2',
    title: '⭐ Aspirator',
    description: 'Aspiratory do nosa skutecznie oczyszczają zalegającą wydzielinę, przywracając dziecku komfort oddychania. Ze swojej strony polecamy aspiratory ustne, które można podłączyć do odkurzacza, co ułatwia i przyspiesza proces odciągania wydzieliny.',
    products: [
      {
        id: 'product-3',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
        title: 'Apple Watch Series 8',
        price: '399',
        currency: 'USD'
      },
      {
        id: 'product-4',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        title: 'Sony WH-1000XM4 Headphones',
        price: '349',
        currency: 'USD'
      }
    ]
  }
];

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'olek',
    name: 'Olek',
    avatar: avatars.owl,
    wishlists: [
      {
        id: 'olek-birthday',
        name: 'Birthday Wishlist',
        gradient: gradients.gradient4,
        isPublic: true,
        avatar: avatars.owl
      },
      {
        id: 'olek-christmas',
        name: '🎄 Christmas',
        gradient: gradients.gradient5,
        isPublic: true,
        avatar: avatars.owl
      },
      {
        id: 'olek-wedding',
        name: '💍 Wedding',
        gradient: gradients.gradient6,
        isPublic: true,
        avatar: avatars.owl
      }
    ]
  },
  {
    id: 'beata',
    name: 'Beata',
    avatar: avatars.bear,
    wishlists: [
      {
        id: 'beata-birthday',
        name: 'Birthday Wishlist',
        gradient: gradients.gradient2,
        isPublic: true,
        avatar: avatars.bear
      },
      {
        id: 'beata-christmas',
        name: '🎄 Christmas',
        gradient: gradients.gradient3,
        isPublic: true,
        avatar: avatars.bear
      },
      {
        id: 'beata-baby',
        name: '👶 Baby Shower',
        gradient: gradients.gradient1,
        isPublic: true,
        avatar: avatars.bear
      }
    ]
  }
];

export const MOCK_WISHES_BY_LIST: Record<string, Wish[]> = {
  'my-wishlist': [
    {
      id: 'wish-1',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
      title: 'PlayStation 5 (PS5) Digital Edition',
      price: '399',
      currency: 'USD',
      note: 'I would love to have this in white color!',
      isBooked: false
    },
    {
      id: 'wish-2',
      image: 'https://images.unsplash.com/photo-1587304947504-bd1505248e2c?w=500',
      title: 'Dior Sauvage Parfum',
      price: '150',
      currency: 'USD',
      isBooked: false
    }
  ],
  'st-nicolas': [
    {
      id: 'wish-3',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      title: 'Apple Watch Series 8',
      price: '399',
      currency: 'USD',
      isBooked: true
    }
  ],
  'new-year': [
    {
      id: 'wish-4',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      title: 'Sony WH-1000XM4 Headphones',
      price: '349',
      currency: 'USD',
      isBooked: false
    }
  ],
  'olek-birthday': [
    {
      id: 'wish-5',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      title: 'Nike Air Max',
      price: '199',
      currency: 'USD',
      isBooked: false
    },
    {
      id: 'wish-6',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      title: 'Smart Watch Pro',
      price: '299',
      currency: 'USD',
      isBooked: true
    }
  ],
  'olek-christmas': [
    {
      id: 'wish-7',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      title: 'Wireless Headphones',
      price: '199',
      currency: 'USD',
      isBooked: false
    },
    {
      id: 'wish-8',
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500',
      title: 'Gaming Laptop',
      price: '1299',
      currency: 'USD',
      isBooked: false
    }
  ],
  'olek-wedding': [
    {
      id: 'wish-9',
      image: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=500',
      title: 'Coffee Machine',
      price: '499',
      currency: 'USD',
      isBooked: false
    }
  ],
  'beata-birthday': [
    {
      id: 'wish-10',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      title: 'Nike Air Jordan',
      price: '299',
      currency: 'USD',
      isBooked: false
    }
  ],
  'beata-christmas': [
    {
      id: 'wish-11',
      image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500',
      title: 'Apple iPad Pro',
      price: '799',
      currency: 'USD',
      isBooked: true
    }
  ],
  'beata-baby': [
    {
      id: 'wish-12',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
      title: 'Baby Stroller',
      price: '499',
      currency: 'USD',
      isBooked: false
    }
  ]
};