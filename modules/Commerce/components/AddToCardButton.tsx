import { useContext, useState } from 'react';

import CartContext from '../context/CartContext';
import { motion } from 'framer-motion';

interface IItem {
  databaseId: number;
  name: string;
  price: string;
  quantity: number;
  image: any;
  href: string;
}
type TButton = {
  item: IItem;
  large?: boolean;
};
const AddToCartButton = ({ item, large }: TButton) => {
  const [added, setAdded] = useState(false);
  const { addToCart, existsInCart } = useContext(CartContext);
  //('ADDING TO CART =>', item);

  const handleAddToCart = () => {
    let timeout;
    addToCart({
      id: item.databaseId,
      name: item.name,
      price: parseInt(item.price),
      quantity: 1,
      image: item.image,
      href: item.href,
    });
    setAdded(true);
    timeout = setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <button
      className={`bg-brand-red inline-block text-white  rounded-full hover:ring-4 ring-brand-red/20  ${
        large ? 'px-6 h-11 py-2 text-xl' : 'text-sm h-8 lg:text-base px-4 py-1'
      }`}
      onClick={() => handleAddToCart()}
    >
      {added ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
export default AddToCartButton;
