/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import StoreItems from '../data/items.json';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type MetaObject = {
  size: string;
  color: string;
  width: string;
};

type CartItem = {
  id: number;
  quantity: number;
  meta: MetaObject;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  getItemMeta: (id: number) => MetaObject;
  increaseCartQuantity: (id: number, qty: number, meta: object) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartSubTotal: () => number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    let cart;
    try {
      cart = JSON.parse(localStorage.getItem('cart'));
    } catch {
      // errors
    }
    return cart || [];
  });

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartSubTotal = () => {
    let subTotal = 0;

    cartItems.forEach((cartItem) => {
      const storeItem = StoreItems.find((item) => item.id === cartItem.id);
      subTotal += cartItem.quantity * (storeItem?.price || 0);
    });

    return subTotal;
  };

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const getItemMeta = (id: number) => {
    return cartItems.find((item) => item.id === id)?.meta || {};
  };

  const increaseCartQuantity = (id: number, qty: number, meta: object) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: qty, meta }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + qty };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  useEffect(
    () => localStorage.setItem('cart', JSON.stringify(cartItems)),
    [cartItems]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        getItemMeta,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
