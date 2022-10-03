import { useEffect, useState } from 'react';

const defaultOptions = [
  {
    label: 'Shipping',
    description: 'Shipping to be specified in invoice.',
    value: 'delivery',
    availableForPaymentMethods: ['invoice'],

    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className='w-12 h-12 fill-current'
      >
        <g>
          <rect fill='none' height='24' width='24' />
        </g>
        <g>
          <g>
            <path d='M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z' />
            <rect height='2' width='6' x='9' y='12' />
          </g>
        </g>
      </svg>
    ),
  },
  {
    label: 'Fixed price',
    description: 'Fixed shipping cost.',
    value: 'fixed-price',
    availableForPaymentMethods: ['stripe'],

    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-12 h-12 fill-current'
        viewBox='0 0 24 24'
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' />
      </svg>
    ),
  },
];
const fetcher = (url) => fetch(url).then((res) => res.json());
const useDelivery = (paymentMethods, shipping) => {
  // const { data, error } = useSWR('/api/shipping', fetcher);
  // //('SWR DELIVERY', data, error);
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState(options[0]);
  const [cost, setCost] = useState(0);

  const updateDelivery = (option: any) => {
    if (option.value === selected?.value) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };
  useEffect(() => {
    const matchingDeliveryOption = options.find((o) =>
      o.availableForPaymentMethods.includes(
        paymentMethods.method.selected.value
      )
    );
    setSelected(matchingDeliveryOption);
  }, [paymentMethods.method.selected]);
  useEffect(() => {
    if (paymentMethods.method.selected.value === 'stripe') {
      if (shipping.data.country.code === 'SE') {
        setCost(29);
      } else if (shipping.data.country.isEurope) {
        setCost(39);
      } else {
        setCost(49);
      }
    } else {
      setCost(0);
    }
  }, [shipping.data.country, paymentMethods.method.selected]);
  return {
    cost,
    options,
    selected,

    update: updateDelivery,
  };
};

export default useDelivery;
