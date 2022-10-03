import Link from 'next/link';
import { WishlistContext } from '@modules/Wishlist/context/WishlistContext';
import { useContext } from 'react';
interface WishlistLinkProps {}

const WishlistLink = ({}: WishlistLinkProps) => {
  const wishlist = useContext(WishlistContext);
  return (
    <>
      <Link href='/productlist'>
        <a>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 fill-current'
            viewBox='0 0 24 24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M13 7.5h5v2h-5zm0 7h5v2h-5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6H6v5h5V6zm-1 4H7V7h3v3zm1 3H6v5h5v-5zm-1 4H7v-3h3v3z' />
          </svg>
          <span className='absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -right-1 -bottom-1 bg-brand-red'>
            {wishlist.items.length}
          </span>
        </a>
      </Link>
    </>
  );
};

export default WishlistLink;
