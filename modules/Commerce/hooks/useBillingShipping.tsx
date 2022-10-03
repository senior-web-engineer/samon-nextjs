import { useContext, useEffect, useState } from 'react';

import CartContext from '../context/CartContext';
import { LocationContext } from '@modules/Location/LocationContext';

const useBillingShipping = (
  setError: any,
  step: number,
  setStep: (step: number) => void
) => {
  const location = useContext(LocationContext);
  const [shippingIsSameAsBilling, setShippingIsSameAsBilling] =
    useState<boolean>(true);
  //Billing
  const [billingData, setBillingData] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: {
      code: location.country_code || '',
      name: location.country || '',
    },
    email: '',
    phone: '',
    company: '',
    vatNum: '',
  });
  const [billingIsComplete, setBillingIsComplete] = useState<boolean>(false);
  const [billingEditing, setBillingEditing] = useState<boolean>(true);

  const updateBilling = (key, value) => {
    const newBilling = { ...billingData, [key]: value };
    setBillingData(newBilling);
  };
  // const { currency } = useContext(CartContext);
  // useEffect(() => {
  //   if (billingData.country.code === 'SE') {
  //     currency.change('sek');
  //   } else {
  //     currency.change('eur');
  //   }
  // }, [billingData.country, currency]);
  const validateBilling = () => {
    setError('');
    //Check if all necessary billing info is provided before setting complete
    if (!billingData.company) {
      setError('Company is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.vatNum) {
      setError('VAT Number is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.first_name) {
      setError('First name is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.last_name) {
      setError('Last name is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.email) {
      setError('Email is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.phone) {
      setError('Phone is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.address_1) {
      setError('Address is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.city) {
      setError('City is required');
      setBillingIsComplete(false);
      return false;
    }
    // if (!billingData.state) {
    //   setError('State is required');
    //   setBillingIsComplete(false);
    //   return false;
    // }
    if (!billingData.postcode) {
      setError('Postcode is required');
      setBillingIsComplete(false);
      return false;
    }
    if (!billingData.country) {
      setError('Country is required');
      setBillingIsComplete(false);
      return false;
    }

    return true;
  };

  const editBilling = (ev) => {
    ev.preventDefault();
    setBillingEditing(true);
  };

  const continueToShipping = (ev) => {
    ev.preventDefault();
    const isValidBilling = validateBilling();
    if (isValidBilling) {
      setShippingData({
        first_name: shippingData.first_name || billingData.first_name,
        last_name: shippingData.last_name || billingData.last_name,
        address_1: shippingData.address_1 || billingData.address_1,
        city: shippingData.city || billingData.city,
        state: shippingData.state || billingData.state,
        postcode: shippingData.postcode || billingData.postcode,
        country: billingData.country || shippingData.country,
      });

      setBillingEditing(false);
      setBillingIsComplete(true);
    }
  };

  //Shipping
  const [shippingData, setShippingData] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: {},
  });
  const [shippingIsComplete, setShippingIsComplete] = useState<boolean>(false);
  const [shippingEditing, setShippingEditing] = useState<boolean>(true);

  const updateShipping = (key, value) => {
    const newShipping = { ...shippingData, [key]: value };
    setShippingData(newShipping);
  };

  const editShipping = (ev) => {
    ev.preventDefault();
    setShippingEditing(true);
  };

  const validateShipping = () => {
    setError('');
    //Check if all necessary billing info is provided before setting complete

    if (!shippingData.first_name) {
      setError('First name is required');
      setShippingIsComplete(false);
      return false;
    }
    if (!shippingData.last_name) {
      setError('Last name is required');
      setShippingIsComplete(false);
      return false;
    }
    if (!shippingData.address_1) {
      setError('Address is required');
      setShippingIsComplete(false);
      return false;
    }
    if (!shippingData.city) {
      setError('City is required');
      setShippingIsComplete(false);
      return false;
    }
    // if (!billingData.state) {
    //   setError('State is required');
    //   setBillingIsComplete(false);
    //   return false;
    // }
    if (!billingData.postcode) {
      setError('Postcode is required');
      setShippingIsComplete(false);
      return false;
    }
    if (!billingData.country) {
      setError('Country is required');
      setShippingIsComplete(false);
      return false;
    }

    return true;
  };
  const continueToPaymentOptions = (ev) => {
    ev.preventDefault();
    const isValidShipping = validateShipping();
    if (isValidShipping) {
      setShippingIsComplete(true);
      setShippingEditing(false);
    }
  };

  return {
    billing: {
      data: billingData,
      completed: billingIsComplete,
      editing: billingEditing,
      setCompleted: setBillingIsComplete,
      update: updateBilling,
      validate: validateBilling,
      continue: continueToShipping,
      edit: editBilling,
    },
    shipping: {
      data: shippingData,
      completed: shippingIsComplete,
      editing: shippingEditing,
      setCompleted: setShippingIsComplete,
      update: updateShipping,
      continue: continueToPaymentOptions,
      edit: editShipping,
    },
  };
};
export default useBillingShipping;
