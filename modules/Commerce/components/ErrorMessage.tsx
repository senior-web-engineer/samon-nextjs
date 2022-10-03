import CheckoutContext from '../context/CheckoutContext';
import { useContext } from 'react';

const ErrorMessage = () => {
  const { error } = useContext(CheckoutContext);
  if (!error) return null;

  return (
    <div
      className={`py-3 opacity-0 bg-brand-red/20 text-brand-red my-5 font-bold text-center `}
    >
      <p>{error}</p>
    </div>
  );
};
export default ErrorMessage;
