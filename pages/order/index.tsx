import { useContext, useState } from 'react';

import CartContext from '@modules/Commerce/context/CartContext';
import Checkout from '@modules/Commerce/components/Checkout';
import CheckoutContext from '@modules/Commerce/context/CheckoutContext';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import MinimalCart from '@modules/Commerce/components/MinimalCart';
import { NextSeo } from 'next-seo';
import useCheckout from '@modules/Commerce/hooks/useCheckout';
import { useEffect } from 'react';

const OrderPage = () => {
  const { closeCart } = useContext(CartContext);
  const CheckoutData = useCheckout();

  useEffect(() => {
    closeCart();
  }, []);

  return (
    <>
      <NextSeo title={`Checkout`} />
      <Hero />
      <div className='contain row'>
        <h1>Complete your order</h1>
        <div className='row grid lg:grid-cols-[1fr,1fr] gap-10'>
          <CheckoutContext.Provider value={CheckoutData}>
            <Checkout />
            <MinimalCart />
          </CheckoutContext.Provider>
        </div>
      </div>
    </>
  );
};
export default OrderPage;
