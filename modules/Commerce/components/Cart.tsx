import CartContext from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Price from './Product/Price';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';
const cartModal = {
  visible: {
    x: 0,
    zIndex: '9999',
  },
  hidden: {
    x: '100%',
    zIndex: '9999',
  },
};
const cartModalOverlay = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const Cart = () => {
  const {
    items,
    totalQuantity,
    cartOpen,
    toggleCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useContext(CartContext);

  const cookieConsentState = useCookieConsentState()
  
  return (
    <>
      <button className='relative z-50 lg:block' onClick={() => toggleCart()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-6 h-6 fill-current '
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
        </svg>
        <figure className='absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -bottom-1 -right-1 bg-brand-red'>
          {totalQuantity}
        </figure>
      </button>
      <motion.div
        variants={cartModalOverlay}
        initial='hidden'
        animate={cartOpen ? 'visible' : 'hidden'}
        className={`w-screen z-[998] h-screen bg-black/60 fixed top-0 -left-3 ${
          cartOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => toggleCart(false)}
      />
      <motion.div
        variants={cartModal}
        initial='hidden'
        animate={cartOpen ? 'visible' : 'hidden'}
        transition={{ type: 'tween' }}
        className='fixed top-0 right-0 z-[999] flex flex-col w-full h-screen max-w-md text-black normal-case bg-white'
      >
        <div className='flex items-center justify-between p-5 '>
          <strong>Your basket</strong>
          <button className='z-50' onClick={() => toggleCart(false)}>
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
        <div className='p-5 '>
          {items.length > 0 ? (
            <ul>
              {items?.map((item) => {
                //('CART ITEM =>', item);
                return (
                  <li
                    key={item.id}
                    className='grid gap-5 grid-cols-[44px,1fr,16px]'
                  >
                    <figure className='relative'>
                      {item?.image && (
                        <Image
                          src={item.image}
                          layout='fill'
                          objectFit='cover'
                          alt={item.name}
                        />
                      )}
                    </figure>
                    <div className='text-left'>
                      <Link href={item.href}>
                        <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${item.href}`, `${item.name}`) : ''}>
                          <strong>{item.name}</strong>
                        </a>
                      </Link>
                      <div className='flex items-center space-x-5 text-sm'>
                        <span className='flex items-center space-x-2'>
                          <p className='font-medium'>Price:</p>
                          <p>
                            <Price price={item.price} />
                          </p>
                        </span>
                        <span className='flex items-center space-x-2'>
                          <p className='font-medium'>Quantity:</p>
                          <p className='flex items-center space-x-2'>
                            <button onClick={() => decrementQuantity(item.id)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className={`w-4 h-4 fill-current text-black/30 hover:text-black/60 ${
                                  item.quantity === 1 && 'opacity-0'
                                }`}
                              >
                                <path d='M0 0h24v24H0V0z' fill='none' />
                                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z' />
                              </svg>
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => incrementQuantity(item.id)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='w-4 h-4 fill-current text-black/30 hover:text-black/60'
                              >
                                <path d='M0 0h24v24H0V0z' fill='none' />
                                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
                              </svg>
                            </button>
                          </p>
                        </span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        className='w-4 h-4 fill-current'
                      >
                        <path d='M0 0h24v24H0V0z' fill='none' />
                        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Your basket is empty</p>
          )}
        </div>

        <div className='flex-1 p-5 bg-brand-gray'>
          <Link href='/order'>
            <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/order`, `Buy now`) : ''} className={`block w-full py-4 text-center btn`}>Buy now</a>
          </Link>
        </div>
      </motion.div>
    </>
  );
};
export default Cart;
