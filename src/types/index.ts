export interface Wish {
  id: string;
  image: string;
  title: string;
  price: string;
  currency: string;
  note?: string;
  isBooked?: boolean;
}

export interface Wishlist {
  id: string;
  name: string;
  gradient: string;
  isPublic: boolean;
  avatar?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isSelected?: boolean;
  wishlists?: Wishlist[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  currency: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  products: Product[];
}