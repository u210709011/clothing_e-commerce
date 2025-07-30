import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@DuyuBox_Cart';

export const CartStorage = {
  async saveCart(cart: any): Promise<void> {
    try {
      const cartJson = JSON.stringify(cart);
      await AsyncStorage.setItem(CART_STORAGE_KEY, cartJson);
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  },

  async loadCart(): Promise<any | null> {
    try {
      const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return cartJson ? JSON.parse(cartJson) : null;
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return null;
    }
  },

  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from storage:', error);
    }
  }
};