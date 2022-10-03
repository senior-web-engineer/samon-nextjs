import { createContext } from 'react';
interface ICurrency {
  value: string;
  change: (value: string) => void;
}
export type IUseCart = {
  items: IItem[];
  totalQuantity: number;
  currency: ICurrency;
  subtotal: number;
  discount: number;
  total: number;
  addToCart: (item: IItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  toggleCart: (state?: boolean) => void;
  incrementQuantity: (index: number) => void;
  decrementQuantity: (index: number) => void;
  existsInCart: (id: number) => boolean;
  closeCart: () => void;
};
export type IItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  href: string;
};
const CartContext = createContext<Partial<IUseCart>>({});
export default CartContext;
