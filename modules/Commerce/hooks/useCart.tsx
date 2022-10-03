import { IItem, IUseCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

import store from 'store';
import { useRouter } from 'next/router';

const useCart = (): IUseCart => {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState(store.get('cart') || []);
  const [currency, setCurrency] = useState('eur');
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (cartOpen) {
      setCartOpen(false);
    }
  }, [router.asPath]);
  useEffect(() => {
    
    const quantity = items.reduce((acc:any, item:any) => acc + item.quantity, 0);
    //const quantity = items?.quantity ? items.reduce((acc:any, item:any) => acc + item.quantity, 0) : null;
    setTotalQuantity(quantity);
  }, [items]);
  useEffect(() => {
    // const amount = !items?.price || !items?.quantity ? null : items.reduce((acc, item) => {
    //   return acc + item.price * item.quantity;
    // }, 0);
    const amount = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setSubtotal(amount);
  }, [items, totalQuantity, currency]);

  useEffect(() => {
    if (subtotal - discount < 0) {
      setTotal(0);
    } else {
      setTotal(subtotal - discount);
    }
  }, [subtotal, discount]);
  const toggleCart = (state?: boolean) => {
    if (state) {
      setCartOpen(state);
    } else {
      setCartOpen(!cartOpen);
    }
  };
  const closeCart = () => {
    setCartOpen(false);
  };
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [cartOpen]);
  const addToCart = (item: IItem) => {
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      const a = [...items];
      a.map((i) => {
        if (i.id === item.id) {
          i.quantity += 1;
        }
      });

      setItems(a);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };
  const removeFromCart = (id) => {
    const a = [...items];
    const index = a.indexOf(a.find((i) => i.id === id));
    a.splice(index, 1);
    setItems(a);
  };
  const incrementQuantity = (id: number, amount?: number) => {
    const a = [...items];
    a.map((i) => {
      if (i.id === id) {
        i.quantity += amount || 1;
      }
    });
    setItems(a);
  };
  const decrementQuantity = (id: number, amount?: number) => {
    const a = [...items];
    a.map((i) => {
      if (i.id === id) {
        if (i.quantity > 1) {
          i.quantity -= amount || 1;
        }
      }
    });
    setItems(a);
  };
  const existsInCart = (id) => {
    const exists = items.find((i) => i.id === id);
    if (exists) {
      return true;
    } else {
      return false;
    }
  };

  const clearCart = () => {
    setItems([]);
  };
  useEffect(() => {
    store.set('cart', items);
  }, [items]);
  return {
    items,
    currency: {
      value: currency,
      change: setCurrency,
    },
    subtotal,
    discount,
    total,
    totalQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    cartOpen,
    toggleCart,
    existsInCart,
    incrementQuantity,
    decrementQuantity,
    closeCart,
  };
};
export default useCart;
