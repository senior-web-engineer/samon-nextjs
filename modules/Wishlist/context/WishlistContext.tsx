import { createContext, useEffect, useState } from 'react';

import store from 'store';

interface WishlistContextInterface {
  items: any;
  open: boolean;
  add: (item: any) => void;
  remove: (id: number) => void;
  toggle: () => void;
  exists: (item: any) => any;
}

export const WishlistContext = createContext<Partial<WishlistContextInterface>>(
  {}
);
const WishlistProvider = ({ children }) => {
  const wishlist = useWishlist();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
};
export default WishlistProvider;

const useWishlist = () => {
  const [items, setItems] = useState(store.get('productlist') || []);
  const [open, setOpen] = useState(false);

  //toggle wishlist
  const toggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    store.set('productlist', items);
  }, [items]);
  const exists = (item) => {
    const found = items.find((i) => {
      for (let currentItems of item) {
        return i.databaseId === currentItems.databaseId ? true : false;
      }
    });

    return found ? true : false;
  };
  //Add to wishlist
  const add = (newItems: any[]) => {
    let a = [...items];
    for (let p of newItems) {
      if (p.product) {
        const exists = items.find((i) => i.databaseId === p.product.databaseId);
        if (!exists) {
          a.push(p.product);
        }
      } else {
        const exists = items.find((i) => i.databaseId === p.databaseId);
        if (!exists) {
          a.push(p);
        }
      }
    }

    let newArray = [...a];
    //('New array =>', newArray);

    setItems(newArray);
  };
  const remove = (id: number) => {
    setItems((prev) => items.filter((item) => item.databaseId !== id));
  };
  return { items, open, add, exists, remove, toggle };
};
