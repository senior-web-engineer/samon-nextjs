import { useContext, useEffect } from 'react';

import Cart from '@modules/Commerce/components/Cart';
import CartContext from '@modules/Commerce/context/CartContext';
import Link from 'next/link';
import Logo from '@common/ui/Logo/Logo';
import WishlistLink from './WishlistLink';
import link from 'next/link';
import { links } from '@data/links';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

const listContainer = {
  enter: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const listItem = {
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 50,
    opacity: 0,
  },
};
const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState<true | false>(false);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const { cartOpen } = useContext(CartContext);

  const router = useRouter();
  const container = {
    open: {
      x: '0vw',
    },
    closed: {
      x: '100vw',
    },
  };

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
  return (
    <>
      {!cartOpen && (
        <div
          onClick={() => setOpen(!open)}
          className={`p-2 bg-brand-red text-white cursor-pointer md:hidden z-20`}
        >
          {open ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-8 h-8 fill-current'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-8 h-8 fill-current'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          )}
        </div>
      )}

      <motion.div
        variants={container}
        animate={open ? 'open' : 'closed'}
        initial={container.closed}
        transition={{ type: 'tween' }}
        className='fixed top-0 right-0 z-10 flex items-start justify-center w-screen h-screen pt-10 bg-black/95 backdrop-blur-md md:hidden'
      >
        <motion.ul
          variants={listContainer}
          animate={open ? 'enter' : 'exit'}
          transition={{ type: 'tween' }}
          className='flex justify-between flex-col w-[80%]  text-xl text-center text-white uppercase font-display'
        >
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ type: 'tween' }}
            key='samon-logo'
            className='block w-16 h-16 mx-auto'
          >
            <Logo />
          </motion.li>
          {links.main.map((link, index) => (
            <MobileMenuItem
              index={index}
              submenuIndex={submenuIndex}
              setSubmenuIndex={setSubmenuIndex}
              key={link.href}
              link={link}
            />
          ))}

          <li className='flex items-center justify-center pt-5 space-x-5'>
            <Cart />
            <WishlistLink />
          </li>
          <li className='grid grid-cols-2 mt-5 text-sm'>
            <Link href='/content'>
              <a>General content</a>
            </Link>
            <Link href='/documents'>
              <a>Documents</a>
            </Link>
          </li>
        </motion.ul>
      </motion.div>
    </>
  );
};
export default MobileMenu;

const MobileMenuItem = ({ link, index, submenuIndex, setSubmenuIndex }) => {
  return (
    <motion.li className='w-full border-b' variants={listItem} key={link.label}>
      <div className='flex items-center justify-between py-3'>
        <Link href={link.href}>{link.label}</Link>
        {link.subnav && (
          <button
            onClick={() =>
              setSubmenuIndex(submenuIndex === index ? null : index)
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className={`w-6 h-6 text-white fill-current ${
                submenuIndex === index ? 'rotate-180' : ''
              }`}
            >
              <path d='M24 24H0V0h24v24z' fill='none' opacity='.87' />
              <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z' />
            </svg>
          </button>
        )}
      </div>

      {submenuIndex === index && (
        <ul className='pb-5 text-base text-left'>
          {link?.subnav?.map((sublink) => (
            <li className='pb-3' key={sublink.href}>
              {sublink.href ? (
                <Link href={sublink.href}>
                  <a>{sublink.label}</a>
                </Link>
              ) : (
                <span>{sublink.label}</span>
              )}

              <ul className='pt-1 space-y-1 text-sm'>
                {sublink?.subnav?.map((sslink, index) => (
                  <li className='opacity-80' key={sslink.href + index}>
                    {sslink.href ? (
                      <Link href={sslink.href}>
                        <a className='normal-case'>{sslink.label}</a>
                      </Link>
                    ) : (
                      <span className='normal-case '>{sslink.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
};
