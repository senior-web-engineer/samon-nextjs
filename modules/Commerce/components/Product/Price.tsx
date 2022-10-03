import CartContext from '@modules/Commerce/context/CartContext';
import { useContext } from 'react';

interface PriceProps {
  price: any;
}

const Price = ({ price }: PriceProps) => {
  if (!price && price !== 0) {
    return null;
  }

  return <>€{price}</>;
};

export default Price;
