import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique cart item id (product_id + variant_id combo)
  productId: number;
  name: string;
  price: number;
  regularPrice?: number;
  image: string;
  quantity: number;
  selectedAttributes?: Record<string, string>;
  slug: string;
}

interface AuthUser {
  id: number;
  username: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}

interface AppState {
  cart: CartItem[];
  wishlist: any[];
  compare: any[];
  user: AuthUser | null;
  couponCode: string | null;
  couponDiscount: number; // percentage or fixed value
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist actions
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: number) => boolean;

  // Compare actions
  toggleCompare: (product: any) => void;
  isInCompare: (productId: number) => boolean;

  // Auth actions
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      user: null,
      couponCode: null,
      couponDiscount: 0,

      addToCart: (item) => {
        const cart = get().cart;
        const attrKey = item.selectedAttributes 
          ? Object.entries(item.selectedAttributes).map(([k, v]) => `${k}:${v}`).join('|')
          : '';
        const id = `${item.productId}-${attrKey}`;

        const existingItemIndex = cart.findIndex((i) => i.id === id);

        if (existingItemIndex > -1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...item, id }] });
        }
      },

      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.id !== cartItemId) });
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        const updatedCart = get().cart.map((item) => 
          item.id === cartItemId ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code) => {
        const uppercaseCode = code.toUpperCase();
        if (uppercaseCode === 'WELCOME10') {
          set({ couponCode: uppercaseCode, couponDiscount: 10 }); // 10% off
          return true;
        } else if (uppercaseCode === 'VIP25') {
          set({ couponCode: uppercaseCode, couponDiscount: 25 }); // 25% off
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((p) => p.id === product.id);
        if (exists) {
          set({ wishlist: wishlist.filter((p) => p.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      toggleCompare: (product) => {
        const compare = get().compare;
        const exists = compare.some((p) => p.id === product.id);
        if (exists) {
          set({ compare: compare.filter((p) => p.id !== product.id) });
        } else {
          if (compare.length >= 4) {
            // limit to 4 items for comparison
            return;
          }
          set({ compare: [...compare, product] });
        }
      },

      isInCompare: (productId) => {
        return get().compare.some((p) => p.id === productId);
      },

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    {
      name: 'empire-ecommerce-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
