import { useState } from 'react';
const usePaymentMethods = () => {
  const [completed, setCompleted] = useState(false);
  const [editing, setEditing] = useState(true);
  const [availableMethods, setAvailableMethods] = useState([
    {
      label: 'Invoice',
      value: 'invoice',
      description: 'You will recieve an invoice',

      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-12 h-12 fill-current'
        >
          <path d='M0,0h24v24H0V0z' fill='none' />
          <g>
            <path d='M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z' />
            <rect height='2' width='6' x='9' y='7' />
            <rect height='2' width='2' x='16' y='7' />
            <rect height='2' width='6' x='9' y='10' />
            <rect height='2' width='2' x='16' y='10' />
          </g>
        </svg>
      ),
    },
    {
      label: 'Card',
      value: 'stripe',
      description: 'Pay securely with Stripe',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-12 h-12 fill-current'
          viewBox='0 0 24 24'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' />
        </svg>
      ),
    },
  ]);
  const [selectedMethod, setSelectedMethod] = useState(availableMethods[0]);
  const updatePaymentMethod = (method: any) => {
    //('UPDATE =>', selectedMethod, method);
    if (method.value === selectedMethod?.value) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
    }
  };
  return {
    completed: completed,
    editing: editing,
    options: availableMethods,
    method: { selected: selectedMethod, update: updatePaymentMethod },
  };
};

export default usePaymentMethods;
