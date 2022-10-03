import { useContext, useEffect } from 'react';

import CartContext from '@modules/Commerce/context/CartContext';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';

interface OrderSuccessProps {}

const OrderSuccess = ({}: OrderSuccessProps) => {
  const cart = useContext(CartContext);
  useEffect(() => {
    cart.clearCart();
  }, []);
  return (
    <>
      <NextSeo title='Order completed' />
      <Hero />
      <Intro
        heading='Order completed'
        body='Thank you for your order. You will recieve an order confirmation to your email with further details.'
      />
    </>
  );
};

export default OrderSuccess;
