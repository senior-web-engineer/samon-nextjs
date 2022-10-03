import { useContext, useEffect, useState } from 'react';

import { WishlistContext } from '../context/WishlistContext';

interface AddToWishlistProps {
  item: any;
}

const AddToWishlist = ({ item }: AddToWishlistProps) => {
  const wishlist = useContext(WishlistContext);
  const [added, setAdded] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [exists, setExists] = useState(wishlist.exists(item));

  const handleAdd = () => {
    let timeout;

    const added: any = wishlist.add(item);

    if (added) {
      setAlreadyAdded(true);
    } else {
      setAdded(true);
      setAlreadyAdded(true);
    }

    timeout = setTimeout(() => {
      setAdded(false);
      setAlreadyAdded(false);
    }, 1000);
  };
  useEffect(() => {
    if (wishlist.exists(item)) {
      setAlreadyAdded(true);
    }
  }, [wishlist.items, added]);

  return (
    <>
      <button
        disabled={alreadyAdded}
        className={`self-start h-11 inline-block  w-full py-2 text-base rounded-full bg-black/5 ${
          alreadyAdded ? '' : 'hover:bg-brand-red hover:text-white'
        }`}
        onClick={() => handleAdd()}
      >
        {alreadyAdded ? 'Added to productlist' : 'Add to productlist'}
      </button>
    </>
  );
};

export default AddToWishlist;
