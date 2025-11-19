
"use client";

import { createContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };

export type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
            ...state,
            items: state.items.filter(item => item.product.id !== action.payload.productId),
        }
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'SET_CART': {
        return {
            ...state,
            items: action.payload,
        }
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

const getInitialState = (): CartState => {
    if (typeof window === 'undefined') {
        return { items: [] };
    }
    try {
        const storedCart = localStorage.getItem('malotec-cart');
        return storedCart ? { items: JSON.parse(storedCart) } : { items: [] };
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        return { items: [] };
    }
}


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {items: []});

  useEffect(() => {
    const initialState = getInitialState();
    dispatch({ type: 'SET_CART', payload: initialState.items });
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
        localStorage.setItem('malotec-cart', JSON.stringify(state.items));
    } else if (localStorage.getItem('malotec-cart')) {
        localStorage.removeItem('malotec-cart');
    }
  }, [state.items]);

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, addItem, removeItem, updateQuantity, clearCart, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
