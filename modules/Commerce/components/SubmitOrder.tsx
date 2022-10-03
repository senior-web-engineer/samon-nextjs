import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import CartContext from '../context/CartContext';
import CheckoutContext from '../context/CheckoutContext';
import Price from './Product/Price';
import Stripe from './PaymentMethods/Stripe';
import StripeProvider from './PaymentMethods/StripeProvider';
import useValidation from '../hooks/useValidation';

interface SubmitOrderProps {}

const SubmitOrder = ({}: SubmitOrderProps) => {
  const validation = useValidation();
  const { order, delivery, paymentOptions } = useContext(CheckoutContext);
  const { subtotal, discount, total, currency } = useContext(CartContext);
  //('PAYMENT OPTIONS =>', paymentOptions);
  useEffect(() => {
    if (order.loading) {
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.pointerEvents = 'unset';
    }
  }, [order.loading]);

  return (
    <>
      <div className='p-5 mt-10 bg-brand-gray'>
        <div className='pb-5'>
          <ul className=''>
            <li className='flex items-center justify-between py-1 border-b last:border-b-0'>
              <span className='text-sm'>Subtotal:</span>
              <span>
                <Price price={subtotal} />
              </span>
            </li>
            <li className='flex items-center justify-between py-2 border-b last:border-b-0'>
              <span className='text-sm'>Shipping:</span>
              {paymentOptions?.method?.selected?.value === 'invoice' ? (
                <span>To be specified in invoice</span>
              ) : (
                <span>
                  <Price price={delivery?.cost} />
                </span>
              )}
            </li>
            {/* <li className='flex items-center justify-between py-2 border-b last:border-b-0'>
              <strong className='text-sm'>Discount:</strong>
              <span>{`${discount} ${currency.toUpperCase()}`}</span>
            </li> */}
            <li className='flex items-center justify-between py-2 font-semibold border-b last:border-b-0'>
              <span className=''>Total:</span>
              <span>
                {delivery?.cost ? (
                  <Price price={delivery?.cost + total} />
                ) : (
                  <Price price={total} />
                )}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={async () => order.create()}
            className={`w-full py-5 ${
              !validation.isSubmitable
                ? 'btn opacity-40 pointer-events-none'
                : ' btn pointer-events-auto opacity-100'
            }`}
          >
            {order.loading ? (
              <span className='flex items-center justify-center space-x-3'>
                <figure className='w-6 h-6 border-4 rounded-full animate-spin border-white/20 border-t-white/100' />{' '}
                <span>Loading...</span>
              </span>
            ) : paymentOptions.method.selected.value === 'stripe' ? (
              'Pay order'
            ) : (
              'Place order'
            )}
          </button>
        </div>

        {order.error && (
          <div className='mt-5 text-center text-red-500'>
            <strong className='block'>An error occured:</strong>
            {order.error}
          </div>
        )}
      </div>
      <StripeProvider>
        <Stripe />
      </StripeProvider>
    </>
  );
};

export default SubmitOrder;
