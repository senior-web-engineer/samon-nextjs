import useBillingShipping from './useBillingShipping';
import useDelivery from './useDelivery';
import useOrder from './useOrder';
import usePaymentMethods from './usePaymentMethods';
import { useState } from 'react';
import useValidation from './useValidation';

const useCheckout = () => {
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);

  const billingShipping = useBillingShipping(setError, step, setStep);
  const paymentMethods = usePaymentMethods();
  const deliveryOptions = useDelivery(paymentMethods, billingShipping.shipping);
  const orderData = useOrder(
    billingShipping.billing,
    billingShipping.shipping,
    paymentMethods,
    deliveryOptions
  );

  //Return hook object
  return {
    billing: billingShipping.billing,
    shipping: billingShipping.shipping,
    paymentOptions: paymentMethods,
    delivery: deliveryOptions,
    order: orderData,
    error,

    step,
  };
};
export default useCheckout;
