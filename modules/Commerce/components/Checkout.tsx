import Billing from './Billing';
import CheckoutContext from '../context/CheckoutContext';
import Delivery from './Delivery';
import PaymentOptions from './PaymentOptions';
import Shipping from './Shipping';
import SubmitOrder from './SubmitOrder';
import useCheckout from '../hooks/useCheckout';
import useOrder from '../hooks/useOrder';
import { useState } from 'react';

const Checkout = () => {
  const onSubmit = async (ev) => {
    ev.preventDefault();
  };
  return (
    <>
      <form onSubmit={(ev) => onSubmit(ev)} className='space-y-5'>
        <Billing />
        <Shipping />
        <PaymentOptions />
        <Delivery />
      </form>
    </>
  );
};
export default Checkout;
