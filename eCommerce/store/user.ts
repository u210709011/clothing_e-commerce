import { create } from 'zustand';
import { Product } from '@/types/product';
import { saveItem, loadItem } from '@/utils/storage';

interface WishlistStore {
  wishlistItems: Product[];
  isLoading: boolean;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  loadWishlist: () => Promise<void>;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlistItems: [],
  isLoading: false,

  addToWishlist: async (product: Product) => {
    const { wishlistItems } = get();
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (!isAlreadyInWishlist) {
      const newWishlist = [...wishlistItems, product];
      set({ wishlistItems: newWishlist });
      await saveItem('wishlist', newWishlist);
    }
  },

  removeFromWishlist: async (productId: string) => {
    const { wishlistItems } = get();
    const newWishlist = wishlistItems.filter(item => item.id !== productId);
    set({ wishlistItems: newWishlist });
    await saveItem('wishlist', newWishlist);
  },

  isInWishlist: (productId: string) => {
    const { wishlistItems } = get();
    return wishlistItems.some(item => item.id === productId);
  },

  loadWishlist: async () => {
    set({ isLoading: true });
    try {
      const savedWishlist = await loadItem('wishlist');
      if (savedWishlist) {
        set({ wishlistItems: savedWishlist });
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearWishlist: async () => {
    set({ wishlistItems: [] });
    await saveItem('wishlist', []);
  },
}));

export const useWishlist = () => {
  const { wishlistItems, isLoading, addToWishlist, removeFromWishlist, isInWishlist, loadWishlist, clearWishlist } = useWishlistStore();
  
  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loadWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length,
  };
};
