import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';

import CheckoutContext from '@modules/Commerce/context/CheckoutContext';
import { countries } from '@data/countries';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface StripeProps {}
const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
};

const Stripe = ({}: StripeProps) => {
  const { order, paymentOptions } = useContext(CheckoutContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    setError('');
    const countryData = countries.find(
      (c) => c.name === order.data.billing.country
    );
    try {
      const result = await stripe.confirmCardPayment(
        order.data.stripe.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name:
                order.data.billing.first_name +
                ' ' +
                order.data.billing.last_name,
              email: order.data.billing.email,
              address: {
                line1: order.data.billing.address_1,
                city: order.data.billing.city,
                country: countryData.code,
                postal_code: order.data.billing.postcode,
              },
            },
          },
        }
      );

      if (result?.paymentIntent?.status === 'succeeded') {
        await order.updateStatus('processing');
        setProcessing(false);
        router.push('/order/thank-you');
      } else {
        setProcessing(false);
        setError(result?.error?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('PAYMENT ERROR =>', error);
      setError('Something went wrong');
      setProcessing(false);
      return;
    }
  };
  if (
    order?.isCollectingPayment?.provider === 'stripe' &&
    paymentOptions?.method?.selected?.value === 'stripe'
  ) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-[98]'
          onClick={() => order.cancelPayment()}
        />
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed bg-white text-center w-full max-w-md rounded-lg shadow-lg px-5 py-7 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto z-[99]'
        >
          <div>
            <h3>Pay with Stripe</h3>
            <p></p>
          </div>
          <div className='p-3 mt-5 border rounded bg-black/5'>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          {error && (
            <div className='pt-5 text-center'>
              <p className='text-brand-red'>{error}</p>
            </div>
          )}
          <div className='mt-5'>
            <button
              className='flex items-center justify-center w-full py-4 space-x-2 btn'
              disabled={!stripe || processing}
              onClick={() => handlePayment()}
            >
              {processing ? (
                <>
                  <figure className='w-6 h-6 border-4 rounded-full animate-spin border-white/20 border-t-white/100' />
                  <span>Processing</span>
                </>
              ) : (
                <>Pay now</>
              )}
            </button>
            <button
              className='w-full py-3 mt-2 font-semibold rounded-full text-brand-red hover:bg-black/5'
              onClick={() => order.cancelPayment()}
            >
              Cancel
            </button>
          </div>

          <div className='flex flex-col items-center justify-center mt-5 space-x-2 text-gray-400 md:flex-row'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 fill-current'
              viewBox='0 0 24 24'
            >
              <g fill='none'>
                <path d='M0 0h24v24H0V0z' />
                <path d='M0 0h24v24H0V0z' opacity='.87' />
              </g>
              <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' />
            </svg>
            <small>Your payment is securely handled by Stripe payments.</small>
          </div>
        </motion.div>
      </>
    );
  }
  return null;
};

export default Stripe;
