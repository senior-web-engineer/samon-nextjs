import Cart from '@modules/Commerce/components/Cart';
import Link from 'next/link';
import Wishlist from '@modules/Wishlist/components/Wishlist';
import { WishlistContext } from '@modules/Wishlist/context/WishlistContext';
import WishlistLink from './WishlistLink';
import { useContext } from 'react';

const Actions = () => {
  return (
    <div className='items-center hidden space-x-3 lg:flex'>
      <Cart />
      <WishlistLink />
    </div>
  );
};
export default Actions;
