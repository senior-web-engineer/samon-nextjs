import { useContext, useEffect, useState } from 'react';

import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';

//TODO: Check if products are available, maybe even before this step

const useOrder = (billing, shipping, payment, delivery) => {
  const cart = useContext(CartContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(cart.total);
  const [isCollectingPayment, setIsCollectingPayment] = useState<any>(false);
  const [lineItems, setLineItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (delivery?.cost) {
      setTotalAmount(cart.total + delivery.cost);
    } else {
      setTotalAmount(cart.total);
    }

    //('TOTAL AMOUNT =>', totalAmount);
  }, [cart.total, delivery.cost]);

  const updateOrderStatus = async (status: string) => {
    try {
      if (!data?.data?.id) {
        return;
      }
      const res = await fetch(`/api/orders/update/${data.data.id}/${status}`);
      const resData = await res.json();
    } catch (error) {
      console.error('ERROR UPDATING ORDER =>', error);
    }
  };
  useEffect(() => {
    let items: any = cart.items.map((product) => {
      return {
        product_id: product.id,
        quantity: product.quantity,
      };
    });

    if (delivery?.cost > 0) {
      setLineItems([
        ...items,
        {
          product_id: process.env.NEXT_PUBLIC_SHIPPING_PRODUCT_ID,
          quantity: 1,
          subtotal: JSON.stringify(delivery.cost),
          total: JSON.stringify(delivery.cost),
        },
      ]);
    } else {
      setLineItems([...items]);
    }
  }, [cart.items, delivery.cost]);

  const handleCancelPayment = () => {
    setIsCollectingPayment(false);
  };
  //Create order
  const createOrder = async (data: any) => {
    setError(null);
    setLoading(true);

    //Create order
    const orderData = {
      payment_method: payment.method.selected.value,
      payment_method_title: payment.method.selected.label,
      currency: 'EUR',
      status: 'processing',
      amount: totalAmount,
      meta_data: [{ key: 'company_vat', value: billing.data.vatNum }],
      billing: {
        first_name: billing.data.first_name,
        last_name: billing.data.last_name,
        address_1: billing.data.address_1,
        address_2: '',
        company: billing.data.company,

        city: billing.data.city,
        state: billing.data.state,
        postcode: billing.data.postcode,
        country: billing.data.country.name,
        email: billing.data.email,
        phone: billing.data.phone,
      },
      shipping: {
        first_name: shipping.data.first_name,
        last_name: shipping.data.last_name,
        address_1: shipping.data.address_1,
        address_2: '',
        city: shipping.data.city,
        state: shipping.data.state,
        postcode: shipping.data.postcode,
        country: shipping.data.country.name,
      },
      line_items: lineItems,
    };
    //('ORDER DATA =>', orderData);
    //Create order in WC
    const orderRes = await fetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    const order = await orderRes.json();

    if (orderRes.status === 200) {
      if (order?.statusCode === 201) {
        setData(order);
        setLoading(false);
        if (payment.method.selected.value === 'invoice') {
          router.push('/order/thank-you');
        }
        if (payment.method.selected.value === 'stripe') {
          setIsCollectingPayment({
            provider: 'stripe',
            key: order?.stripe?.client_secret,
          });
        }
      } else {
        console.log('ERROR =>', order);
        setData(null);
        setLoading(false);
        setError('error');
      }

      setLoading(false);
    } else {
      console.log('ERROR =>', order);
      setData(null);
      setLoading(false);
      setError('error');
    }
    //('ORDER =>', order);
    //Handle OK or ERROR
  };
  return {
    loading,
    data: data?.data,
    isCollectingPayment,
    cancelPayment: handleCancelPayment,
    error,
    create: createOrder,
    updateStatus: updateOrderStatus,
  };
};

export default useOrder;
