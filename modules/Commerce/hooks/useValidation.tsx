import { useContext, useState, useEffect } from 'react';
import CheckoutContext from '../context/CheckoutContext';

const useValidation = () => {
  const { shipping, billing, paymentOptions, delivery } =
    useContext(CheckoutContext);
  const [isSubmitable, setIsSubmitable] = useState(false);
  useEffect(() => {
    if (
      shipping.completed &&
      !shipping.editing &&
      billing.completed &&
      !billing.editing &&
      paymentOptions.method.selected &&
      delivery.selected
    ) {
      setIsSubmitable(true);
    } else {
      setIsSubmitable(false);
    }
  }, [
    shipping.editing,
    shipping.completed,
    billing.editing,
    billing.completed,
    paymentOptions.method.selected,
    delivery.selected,
  ]);
  return { isSubmitable };
};

export default useValidation;
