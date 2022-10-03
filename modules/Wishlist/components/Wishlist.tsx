import { AnimatePresence, motion } from 'framer-motion';

import { WishlistContext } from '../context/WishlistContext';
import { useContext } from 'react';

interface WishlistProps {}

const Wishlist = ({}: WishlistProps) => {
  const wishlist = useContext(WishlistContext);
  return (
    <>
      <button onClick={() => wishlist.toggle()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6'
          viewBox='0 0 24 24'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M13 7.5h5v2h-5zm0 7h5v2h-5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6H6v5h5V6zm-1 4H7V7h3v3zm1 3H6v5h5v-5zm-1 4H7v-3h3v3z' />
        </svg>
        <span className='absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -right-1 -bottom-1 bg-brand-red'>
          {wishlist.items.length}
        </span>
      </button>

      {wishlist.open && (
        <>
          <div
            key='wishlist-overlay'
            className='fixed top-0 -left-[12px] w-screen h-screen bg-black/50 z-[99]'
            onClick={() => wishlist.toggle()}
          />
          <div className='fixed flex flex-col justify-start top-0 right-0 z-[100] h-screen overflow-y-scroll bg-white w-[400px]'>
            <div className='flex items-center justify-between p-5'>
              <strong>Your productlist</strong>
              <button
                className='flex items-center'
                onClick={() => wishlist.toggle()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-6 h-6 fill-current'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                </svg>
              </button>
            </div>
            <div className='p-5'>Products</div>
            <div className='flex-1 h-full p-5 bg-brand-gray'>
              <strong></strong>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;
